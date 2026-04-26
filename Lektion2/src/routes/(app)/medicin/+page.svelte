<script>
	import { onMount } from 'svelte';

	let medicineName = $state('');
	let dose = $state('');
	let defaultTime = $state('');
	let activePlans = $state([]);
	let intakeHistory = $state([]);

	async function loadMedicine() {
		const response = await fetch('/api/medicine');
		const data = await response.json();

		if (response.ok) {
			activePlans = data.plans ?? [];
			intakeHistory = data.history ?? [];
		} else {
			alert(data.error || 'Kunne ikke hente medicin');
		}
	}

	async function saveMedicinePlan() {
		const response = await fetch('/api/medicine', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				medicineName,
				dose,
				defaultTime
			})
		});

		const data = await response.json();

		if (response.ok) {
			alert('Medicinplan gemt');
			medicineName = '';
			dose = '';
			defaultTime = '';
			await loadMedicine();
		} else {
			alert(data.error || 'Kunne ikke gemme medicinplan');
		}
	}

	async function markTakenToday(medicinePlanId) {
		const response = await fetch('/api/medicine', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ medicinePlanId })
		});

		const data = await response.json();

		if (response.ok) {
			alert(data.message || 'Registreret');
			await loadMedicine();
		} else {
			alert(data.error || 'Kunne ikke registrere medicin');
		}
	}

	function intakeForPlanToday(planId) {
		const now = new Date();
		const day = String(now.getDate()).padStart(2, '0');
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const year = now.getFullYear();
		const today = `${day}-${month}-${year}`;

		return intakeHistory.find((entry) => entry.medicinePlanId === planId && entry.date === today);
	}

	onMount(loadMedicine);
</script>

<div class="bg-white border border-gray-400 rounded p-6 h-full">
	<h1 class="text-4xl font-semibold text-gray-800 mb-6">Medicin</h1>

	<div class="grid grid-cols-4 gap-4 mb-6">
		<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
			<p class="text-sm text-gray-500 mb-1">Præparat</p>
			<input
				class="input input-bordered w-full bg-white"
				type="text"
				placeholder="Skriv præparat"
				bind:value={medicineName}
			/>
		</div>

		<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
			<p class="text-sm text-gray-500 mb-1">Dosis</p>
			<input
				class="input input-bordered w-full bg-white"
				type="text"
				placeholder="Fx 1 x 20 mg"
				bind:value={dose}
			/>
		</div>

		<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
			<p class="text-sm text-gray-500 mb-1">Fast tidspunkt</p>
			<input
				class="input input-bordered w-full bg-white"
				type="text"
				placeholder="Fx 08:00"
				bind:value={defaultTime}
			/>
		</div>

		<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7] flex items-end">
			<button
				class="btn w-full bg-[#7fae7b] border-[#7fae7b] text-white"
				onclick={saveMedicinePlan}
			>
				Gem medicinplan
			</button>
		</div>
	</div>

	<div class="border border-gray-300 rounded-lg p-5 bg-[#f8fbf7] mb-6">
		<h2 class="text-2xl font-medium text-gray-800 mb-4">Aktiv medicin</h2>

		{#if activePlans.length === 0}
			<p>Ingen aktiv medicinplan endnu.</p>
		{:else}
			<div class="space-y-4">
				{#each activePlans as plan}
					<div class="border border-gray-300 rounded-lg p-4 bg-white">
						<div class="grid grid-cols-4 gap-4 items-end">
							<div>
								<p class="text-sm text-gray-500 mb-1">Præparat</p>
								<p class="text-lg font-medium text-gray-800">{plan.medicineName}</p>
							</div>

							<div>
								<p class="text-sm text-gray-500 mb-1">Dosis</p>
								<p class="text-lg font-medium text-gray-800">{plan.dose}</p>
							</div>

							<div>
								<p class="text-sm text-gray-500 mb-1">Tidspunkt</p>
								<p class="text-lg font-medium text-gray-800">{plan.defaultTime || '--:--'}</p>
							</div>

							<div>
								<button
									class="btn w-full bg-[#7fae7b] border-[#7fae7b] text-white"
									onclick={() => markTakenToday(plan.id)}
								>
									Taget i dag
								</button>
							</div>
						</div>

						{#if intakeForPlanToday(plan.id)}
							<p class="text-sm text-green-700 mt-3">
								Registreret i dag kl. {intakeForPlanToday(plan.id).time}
							</p>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="border border-gray-300 rounded-lg p-5 bg-[#f8fbf7]">
		<h2 class="text-2xl font-medium text-gray-800 mb-4">Medicinhistorik</h2>

		{#if intakeHistory.length === 0}
			<p>Ingen medicin registreret endnu.</p>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="border-b border-gray-300">
							<th class="py-3 text-gray-600 font-medium">Dato</th>
							<th class="py-3 text-gray-600 font-medium">Tidspunkt</th>
							<th class="py-3 text-gray-600 font-medium">Medicinskema ID</th>
							<th class="py-3 text-gray-600 font-medium">Status</th>
						</tr>
					</thead>
					<tbody>
						{#each intakeHistory as entry}
							<tr class="border-b border-gray-200">
								<td class="py-3 text-gray-800">{entry.date}</td>
								<td class="py-3 text-gray-800">{entry.time}</td>
								<td class="py-3 text-gray-800">{entry.medicinePlanId}</td>
								<td class="py-3 text-gray-800">{entry.taken ? 'Taget' : 'Ikke taget'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>