<script>
	let currentMood = '';
	let moodHistory = [
		{ date: '20-04-2026', time: '14:32', mood: '7/10' },
		{ date: '19-04-2026', time: '18:10', mood: '6/10' },
		{ date: '18-04-2026', time: '20:05', mood: '8/10' }
	];

	function saveMood() {
		if (currentMood !== '') {
			const now = new Date();
			const day = String(now.getDate()).padStart(2, '0');
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const year = now.getFullYear();
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');

			const newEntry = {
				date: `${day}-${month}-${year}`,
				time: `${hours}:${minutes}`,
				mood: `${currentMood}/10`
			};

			moodHistory = [newEntry, ...moodHistory];
			currentMood = '';
		}
	}
</script>

<div class="bg-white border border-gray-400 rounded p-6 h-full">
	<div class="flex items-center justify-between mb-6">
		<h1 class="text-4xl font-semibold text-gray-800">Mood</h1>
	</div>

	<div class="border border-gray-300 rounded-lg p-5 bg-[#f8fbf7] mb-6">
		<h2 class="text-2xl font-medium text-gray-800 mb-4">Ny mood status</h2>

		<div class="flex items-center gap-4">
			<select
				bind:value={currentMood}
				class="border border-gray-300 rounded px-4 py-3 bg-white text-gray-800"
			>
				<option value="">Vælg humør</option>
				<option value="1">1/10</option>
				<option value="2">2/10</option>
				<option value="3">3/10</option>
				<option value="4">4/10</option>
				<option value="5">5/10</option>
				<option value="6">6/10</option>
				<option value="7">7/10</option>
				<option value="8">8/10</option>
				<option value="9">9/10</option>
				<option value="10">10/10</option>
			</select>

			<button
				class="bg-[#7fae7b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6c9c69]"
				onclick={saveMood}
			>
				Gem mood
			</button>
		</div>
	</div>

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

	<div class="border border-gray-300 rounded-lg p-5 bg-[#f8fbf7]">
		<h2 class="text-2xl font-medium text-gray-800 mb-4">Moodhistorik</h2>

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
	</div>
</div>