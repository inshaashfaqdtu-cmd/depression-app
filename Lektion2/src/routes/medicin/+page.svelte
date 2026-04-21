<script>
	import { goto } from '$app/navigation';

	function goToAddMedicine() {
		goto('/tilfoej-medicin');
	}
</script>

<div class="bg-white border border-gray-400 rounded p-6 h-full">
	<h1 class="text-4xl font-semibold text-gray-800 mb-6">Medicin</h1>

	<div class="grid grid-cols-3 gap-4 mb-6">
		<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
			<p class="text-sm text-gray-500 mb-1">Præparat</p>
			<p class="text-lg font-medium text-gray-800">Penicillin</p>
		</div>

		<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
			<p class="text-sm text-gray-500 mb-1">Dosis</p>
			<p class="text-lg font-medium text-gray-800">1 tablet dagligt</p>
		</div>

		<div class="border border-gray-300 rounded-lg p-4 bg-[#f8fbf7]">
			<p class="text-sm text-gray-500 mb-1">Status</p>
			<p class="text-lg font-medium text-gray-800">Taget i dag</p>
		</div>
	</div>

	<div class="border border-gray-300 rounded-lg p-5 bg-[#f8fbf7] mb-6">
		<h2 class="text-2xl font-medium text-gray-800 mb-4">Medicinhistorik</h2>

		<div class="overflow-x-auto">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr class="border-b border-gray-300">
						<th class="py-3 text-gray-600 font-medium">Dato</th>
						<th class="py-3 text-gray-600 font-medium">Præparat</th>
						<th class="py-3 text-gray-600 font-medium">Dosis</th>
						<th class="py-3 text-gray-600 font-medium">Tidspunkt</th>
						<th class="py-3 text-gray-600 font-medium">Status</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-gray-200">
						<td class="py-3 text-gray-800">20-04-2026</td>
						<td class="py-3 text-gray-800">Penicillin</td>
						<td class="py-3 text-gray-800">1 tablet</td>
						<td class="py-3 text-gray-800">08:00</td>
						<td class="py-3 text-gray-800">Taget</td>
					</tr>

					<tr class="border-b border-gray-200">
						<td class="py-3 text-gray-800">19-04-2026</td>
						<td class="py-3 text-gray-800">Penicillin</td>
						<td class="py-3 text-gray-800">1 tablet</td>
						<td class="py-3 text-gray-800">08:10</td>
						<td class="py-3 text-gray-800">Taget</td>
					</tr>

					<tr>
						<td class="py-3 text-gray-800">18-04-2026</td>
						<td class="py-3 text-gray-800">Penicillin</td>
						<td class="py-3 text-gray-800">1 tablet</td>
						<td class="py-3 text-gray-800">-</td>
						<td class="py-3 text-red-600 font-medium">Ikke taget</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="flex gap-4">
		<button class="bg-[#7fae7b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6c9c69]">
			Marker som taget
		</button>

		<button
			class="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100"
			onclick={goToAddMedicine}
		>
			Tilføj medicin
		</button>
	</div>
</div>