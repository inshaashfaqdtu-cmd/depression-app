<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let profile = $state(null);
	let mood = $state(null);
	let medicines = $state([]);
	let medicineSummary = $state(null);
	let reminders = $state(null);

	async function loadStatus() {
		const response = await fetch('/api/status');
		const data = await response.json();

		if (response.ok) {
			profile = data.profile;
			mood = data.mood;
			medicines = data.medicines ?? [];
			medicineSummary = data.medicineSummary;
			reminders = data.reminders;
		} else {
			alert(data.error || 'Kunne ikke hente status');
		}
	}

	function goToMedicine() {
		goto('/medicin');
	}

	function goToMood() {
		goto('/mood');
	}

	function goToBrugerinfo() {
		goto('/brugerinfo');
	}

	onMount(loadStatus);
</script>

<div class="grid grid-cols-[320px_1fr] grid-rows-[auto_auto_1fr] gap-4 h-full">

	{#if reminders?.medicine || reminders?.mood}
		<div class="col-span-2 space-y-3">
			{#if reminders?.medicine}
				<div class="bg-[#fff4cc] border border-[#e6c200] text-[#5c4b00] rounded-lg p-4">
					<p class="font-semibold">Påmindelse om medicin</p>
					<p>{reminders.medicine}</p>
				</div>
			{/if}

			{#if reminders?.mood}
				<div class="bg-[#e8f4ff] border border-[#7db7e8] text-[#1f4e79] rounded-lg p-4">
					<p class="font-semibold">Påmindelse om humørregistrering</p>
					<p>{reminders.mood}</p>
				</div>
			{/if}
		</div>
	{/if}

	<button
		class="bg-white border border-gray-400 rounded p-5 text-left hover:bg-[#eef7ec] transition flex flex-col overflow-hidden"
		onclick={goToBrugerinfo}
	>
		<h2 class="text-3xl font-semibold text-gray-800 mb-6">Brugerinfo</h2>

		<div class="space-y-4">
			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500">Navn</p>
				<p class="text-xl font-semibold">{profile?.name ?? 'Ingen navn gemt'}</p>
			</div>

			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500">Telefon</p>
				<p class="text-xl font-semibold">{profile?.phone ?? 'Ingen telefon gemt'}</p>
			</div>

			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500">Email</p>
				<p class="text-xl font-semibold">{profile?.email ?? 'Ingen email gemt'}</p>
			</div>
		</div>
	</button>

	<div class="bg-white border border-gray-400 rounded p-5 overflow-hidden">
		<h2 class="text-3xl font-semibold text-gray-800 mb-6">Status</h2>

		<div class="grid grid-cols-2 gap-4">
			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500">Medicin i dag</p>
				<p class="text-xl font-semibold">
					{medicineSummary ? `${medicineSummary.takenCount}/${medicineSummary.totalCount}` : '0/0'}
				</p>
				<p class="text-sm text-gray-600">Registreret medicin i dag</p>
			</div>

			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500">Humør i dag</p>
				<p class="text-xl font-semibold">
					{mood?.mood ?? 'Ingen registrering'}
				</p>
				<p class="text-sm text-gray-600">
					Opdateret kl. {mood?.time ?? '--:--'}
				</p>
			</div>
		</div>
	</div>

	<button
		class="bg-white border border-gray-400 rounded p-5 text-left hover:bg-[#eef7ec] transition flex flex-col overflow-hidden"
		onclick={goToMedicine}
	>
		<h2 class="text-3xl font-semibold text-gray-800 mb-6">Medicin</h2>

		<div class="space-y-3">
			{#if medicines.length === 0}
				<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
					<p class="text-xl font-semibold">Ingen aktiv medicin</p>
				</div>
			{:else}
				{#each medicines as medicine}
					<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
						<p class="text-sm text-gray-500">{medicine.medicineName}</p>
						<p class="text-lg font-semibold">{medicine.dose}</p>
						<p class="text-sm text-gray-600">
							{medicine.taken
								? `Taget kl. ${medicine.time ?? '--:--'}`
								: `Ikke registreret · planlagt ${medicine.defaultTime ?? '--:--'}`}
						</p>
					</div>
				{/each}
			{/if}
		</div>

		<div class="mt-auto pt-5">
			<div class="w-full bg-[#7fae7b] text-white rounded px-4 py-3 text-center font-semibold">
				Åbn medicinside
			</div>
		</div>
	</button>

	<button
		class="bg-white border border-gray-400 rounded p-5 text-left hover:bg-[#eef7ec] transition flex flex-col overflow-hidden"
		onclick={goToMood}
	>
		<h2 class="text-3xl font-semibold text-gray-800 mb-6">Mood</h2>

		<div class="space-y-4">
			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500">Seneste registrering</p>
				<p class="text-xl font-semibold">
					{mood?.mood ?? 'Ingen registrering'}
				</p>
				<p class="text-sm text-gray-600">
					{mood ? `${mood.date} kl. ${mood.time}` : 'Ingen tid gemt'}
				</p>
			</div>

			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500">Historik</p>
				<p class="text-xl font-semibold">
					Se tidligere humørregistreringer
				</p>
			</div>
		</div>

		<div class="mt-auto pt-5">
			<div class="w-full bg-[#7fae7b] text-white rounded px-4 py-3 text-center font-semibold">
				Åbn moodside
			</div>
		</div>
	</button>

</div>