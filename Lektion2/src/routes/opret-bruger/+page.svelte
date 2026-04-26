<script>
	import { goto } from '$app/navigation';

	let username = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	async function createUser() {
		if (!username || !password || !confirmPassword) {
			alert('Udfyld alle felter');
			return;
		}

		if (password !== confirmPassword) {
			alert('Adgangskoderne matcher ikke');
			return;
		}

		const response = await fetch('/api/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();

		if (response.ok) {
			alert('Bruger oprettet');
			goto('/login');
		} else {
			alert(data.error || 'Kunne ikke oprette bruger');
		}
	}
</script>

<div class="min-h-screen bg-[#cfe3c4] flex items-center justify-center">
	<div class="w-[420px] bg-[#f4f4f4] rounded-xl shadow-lg p-8">
		<h1 class="text-2xl font-semibold text-center mb-6">Opret bruger</h1>

		<input
			class="input input-bordered w-full mb-3 bg-white"
			type="text"
			placeholder="Brugernavn"
			bind:value={username}
		/>

		<input
			class="input input-bordered w-full mb-3 bg-white"
			type="password"
			placeholder="Adgangskode"
			bind:value={password}
		/>

		<input
			class="input input-bordered w-full mb-5 bg-white"
			type="password"
			placeholder="Gentag adgangskode"
			bind:value={confirmPassword}
		/>

		<button
			class="btn w-full bg-[#7fae7b] border-[#7fae7b] text-white"
			onclick={createUser}
		>
			Opret konto
		</button>
	</div>
</div>