<script>
	import { goto } from '$app/navigation';

	let praeparat = '';
	let dosis = '';
	let tidspunkt = '';

	function goToMedicine() {
		goto('/medicin');
	}

	function saveMedicine() {
		alert('Medicin tilføjet');
		goto('/medicin');
	}
</script>

<div class="bg-white border border-gray-400 rounded p-6 h-full">
	<div class="flex items-center justify-between mb-6">
		<h1 class="text-4xl font-semibold text-gray-800">Tilføj medicin</h1>

		<button
			class="bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-100"
			onclick={goToMedicine}
		>
			Tilbage
		</button>
	</div>

	<div class="max-w-4xl space-y-5">
		<div class="border border-gray-300 rounded-lg p-5 bg-[#f8fbf7]">
			<label class="block text-sm text-gray-500 mb-2">Præparat</label>
			<input
				class="w-full border border-gray-300 rounded px-4 py-3 bg-white text-gray-800"
				type="text"
				placeholder="Skriv navn på medicin"
				bind:value={praeparat}
			/>
		</div>

		<div class="border border-gray-300 rounded-lg p-5 bg-[#f8fbf7]">
			<label class="block text-sm text-gray-500 mb-2">Dosis</label>
			<input
				class="w-full border border-gray-300 rounded px-4 py-3 bg-white text-gray-800"
				type="text"
				placeholder="Fx 1 tablet dagligt"
				bind:value={dosis}
			/>
		</div>

		<div class="border border-gray-300 rounded-lg p-5 bg-[#f8fbf7]">
			<label class="block text-sm text-gray-500 mb-2">Tidspunkt</label>
			<input
				class="w-full border border-gray-300 rounded px-4 py-3 bg-white text-gray-800"
				type="time"
				bind:value={tidspunkt}
			/>
		</div>

		<div class="flex gap-4 pt-2">
			<button
				class="bg-[#7fae7b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6c9c69]"
				onclick={saveMedicine}
			>
				Gem medicin
			</button>

			<button
				class="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100"
				onclick={goToMedicine}
			>
				Annuller
			</button>
		</div>
	</div>
</div>