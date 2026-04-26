<script>
	import { onMount } from 'svelte';

	let username = $state('');
	let password = $state('');
	let users = $state([]);

	async function loadUsers() {
		const response = await fetch('/api/user');
		const data = await response.json();

		if (response.ok) {
			users = data;
		} else {
			alert(data.error || 'Kunne ikke hente brugere');
		}
	}

	async function createUser() {
		const response = await fetch('/api/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();

		if (response.ok) {
			alert('Bruger oprettet');
			username = '';
			password = '';
			await loadUsers();
		} else {
			alert(data.error || 'Noget gik galt');
		}
	}

	async function deleteUser(id) {
		const response = await fetch('/api/user', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		});

		const data = await response.json();

		if (response.ok) {
			alert('Bruger slettet');
			await loadUsers();
		} else {
			alert(data.error || 'Kunne ikke slette bruger');
		}
	}

	onMount(loadUsers);
</script>

<div class="min-h-screen bg-[#cfe3c4] flex items-center justify-center">
	<div class="w-[500px] bg-[#f4f4f4] rounded-xl shadow-lg p-8">
		<h1 class="text-2xl font-semibold text-center mb-6">Admin</h1>

		<input
			class="input input-bordered w-full mb-3 bg-white"
			type="text"
			placeholder="Brugernavn"
			bind:value={username}
		/>

		<input
			class="input input-bordered w-full mb-5 bg-white"
			type="password"
			placeholder="Adgangskode"
			bind:value={password}
		/>

		<button
			class="btn w-full bg-[#7fae7b] border-[#7fae7b] text-white mb-6"
			onclick={createUser}
		>
			Opret bruger
		</button>

		<h2 class="text-xl font-semibold mb-3">Alle brugere</h2>

		{#if users.length === 0}
			<p>Ingen brugere fundet.</p>
		{:else}
			<div class="space-y-2">
				{#each users as oneUser}
					<div class="border rounded-lg p-3 bg-white">
						<p><strong>ID:</strong> {oneUser.id}</p>
						<p><strong>Brugernavn:</strong> {oneUser.username}</p>

						<button
							class="btn mt-3 bg-red-500 border-red-500 text-white"
							onclick={() => deleteUser(oneUser.id)}
						>
							Slet bruger
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>