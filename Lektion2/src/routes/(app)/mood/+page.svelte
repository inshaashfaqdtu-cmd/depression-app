<script>
	import { onMount } from 'svelte';

	let userId = $state(null);
	let currentMood = $state('');
	let moodHistory = $state([]);

	async function loadCurrentUser() {
		const response = await fetch('/api/me');
		const data = await response.json();

		if (response.ok) {
			userId = data.userId;
			await loadMoodHistory();
		} else {
			alert(data.error || 'Kunne ikke hente bruger');
		}
	}

	async function loadMoodHistory() {
		if (!userId) return;

		const response = await fetch(`/api/mood?userId=${userId}`);
		const data = await response.json();

		if (response.ok) {
			moodHistory = data.reverse();
		} else {
			alert(data.error || 'Kunne ikke hente moodhistorik');
		}
	}

	async function saveMood() {
		if (!currentMood) {
			alert('Vælg et mood');
			return;
		}

		const now = new Date();
		const day = String(now.getDate()).padStart(2, '0');
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const year = now.getFullYear();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');

		const date = `${day}-${month}-${year}`;
		const time = `${hours}:${minutes}`;

		const response = await fetch('/api/mood', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				userId,
				mood: currentMood,
				time,
				date
			})
		});

		const data = await response.json();

		if (response.ok) {
			alert('Mood gemt');
			currentMood = '';
			await loadMoodHistory();
		} else {
			alert(data.error || 'Kunne ikke gemme mood');
		}
	}

	onMount(loadCurrentUser);
</script>

<div class="bg-white border border-gray-400 rounded p-6 h-full">
	<div class="flex items-center justify-between mb-6">
		<h1 class="text-3xl font-semibold text-gray-800">Mood</h1>
	</div>

	<div class="border border-gray-300 rounded-lg p-5 bg-[#f8fbf7] mb-6">
		<h2 class="text-2xl font-medium text-gray-800 mb-4">Ny mood status</h2>

		<div class="flex items-center gap-4">
			<select
				bind:value={currentMood}
				class="border border-gray-300 rounded px-4 py-3 bg-white text-gray-800"
			>
				<option value="">Vælg humør</option>
				<option value="1/10">1/10</option>
				<option value="2/10">2/10</option>
				<option value="3/10">3/10</option>
				<option value="4/10">4/10</option>
				<option value="5/10">5/10</option>
				<option value="6/10">6/10</option>
				<option value="7/10">7/10</option>
				<option value="8/10">8/10</option>
				<option value="9/10">9/10</option>
				<option value="10/10">10/10</option>
			</select>

			<button
				class="btn bg-[#7fae7b] border-[#7fae7b] text-white hover:bg-[#6c9c68]"
				onclick={saveMood}
			>
				Gem mood
			</button>
		</div>
	</div>

	{#if moodHistory.length > 0}
		<div class="grid grid-cols-3 gap-4 mb-6">
			<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Seneste registrering</p>
				<p class="text-lg font-medium text-gray-800">{moodHistory[0].mood}</p>
			</div>

			<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Dato</p>
				<p class="text-lg font-medium text-gray-800">{moodHistory[0].date}</p>
			</div>

			<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Tidspunkt</p>
				<p class="text-lg font-medium text-gray-800">{moodHistory[0].time}</p>
			</div>
		</div>
	{/if}

	<div class="border border-gray-300 rounded-lg p-5 bg-[#f8fbf7]">
		<h2 class="text-2xl font-medium text-gray-800 mb-4">Moodhistorik</h2>

		{#if moodHistory.length === 0}
			<p>Ingen moods registreret endnu.</p>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="border-b border-gray-300">
							<th class="py-3 text-gray-600 font-medium">Dato</th>
							<th class="py-3 text-gray-600 font-medium">Tidspunkt</th>
							<th class="py-3 text-gray-600 font-medium">Mood</th>
						</tr>
					</thead>
					<tbody>
						{#each moodHistory as entry}
							<tr class="border-b border-gray-200">
								<td class="py-3 text-gray-800">{entry.date}</td>
								<td class="py-3 text-gray-800">{entry.time}</td>
								<td class="py-3 text-gray-800">{entry.mood}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>