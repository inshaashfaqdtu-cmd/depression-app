<script>
	import { onMount } from 'svelte';

	let userId = $state(null);
	let name = $state('');
	let phone = $state('');
	let email = $state('');

	async function loadCurrentUser() {
		const response = await fetch('/api/me');
		const data = await response.json();

		if (response.ok) {
			userId = data.userId;
			await loadProfile();
		} else {
			alert(data.error || 'Kunne ikke hente bruger');
		}
	}

	async function loadProfile() {
		if (!userId) return;

		const response = await fetch(`/api/profile?userId=${userId}`);
		const data = await response.json();

		if (response.ok && data) {
			name = data.name ?? '';
			phone = data.phone ?? '';
			email = data.email ?? '';
		}
	}

	async function saveProfile() {
		if (!userId) {
			alert('Ingen bruger fundet');
			return;
		}

		const response = await fetch('/api/profile', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				userId,
				name,
				phone,
				email
			})
		});

		const data = await response.json();

		if (response.ok) {
			alert('Profil gemt');
		} else {
			alert(data.error || 'Kunne ikke gemme profil');
		}
	}

	onMount(loadCurrentUser);
</script>

<div class="bg-white border border-gray-400 rounded p-6 h-full">
	<div class="flex items-center justify-between mb-6">
		<h1 class="text-3xl font-semibold text-gray-800">Brugerinfo</h1>
	</div>

	<div class="space-y-4">
		<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
			<label class="block text-sm text-gray-500 mb-2">Navn</label>
			<input
				class="input input-bordered w-full bg-white"
				type="text"
				placeholder="Skriv navn"
				bind:value={name}
			/>
		</div>

		<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
			<label class="block text-sm text-gray-500 mb-2">Telefon</label>
			<input
				class="input input-bordered w-full bg-white"
				type="text"
				placeholder="Skriv telefonnummer"
				bind:value={phone}
			/>
		</div>

		<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
			<label class="block text-sm text-gray-500 mb-2">Email</label>
			<input
				class="input input-bordered w-full bg-white"
				type="email"
				placeholder="Skriv email"
				bind:value={email}
			/>
		</div>

		<button
			class="btn bg-[#7fae7b] border-[#7fae7b] text-white hover:bg-[#6c9c68]"
			onclick={saveProfile}
		>
			Gem oplysninger
		</button>
	</div>
</div>