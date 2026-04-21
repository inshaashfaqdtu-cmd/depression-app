<script>
	import { goto } from '$app/navigation';

	function goToMedicine() {
		goto('/medicin');
	}

	function goToMood() {
		goto('/mood');
	}

	function goToBrugerinfo() {
		goto('/brugerinfo');
	}
</script>

<div class="grid grid-cols-[320px_1fr] grid-rows-[280px_1fr] gap-4 h-full">
	<!-- Brugerinfo preview -->
	<button
		class="bg-white border border-gray-400 rounded p-5 text-left hover:bg-[#eef7ec] transition flex flex-col justify-start overflow-hidden"
		onclick={goToBrugerinfo}
	>
		<h2 class="text-3xl font-semibold text-gray-800 mb-6">Brugerinfo</h2>

		<div class="space-y-4">
			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Navn</p>
				<p class="text-xl font-semibold text-gray-800">Anna Hansen</p>
			</div>

			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Telefon</p>
				<p class="text-xl font-semibold text-gray-800">+45 xxxxxxxx</p>
			</div>

			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Email</p>
				<p class="text-xl font-semibold text-gray-800">anna@mail.com</p>
			</div>
		</div>
	</button>

	<!-- Status -->
	<div class="bg-white border border-gray-400 rounded p-5 overflow-hidden">
		<h2 class="text-3xl font-semibold text-gray-800 mb-6">Status</h2>

		<div class="grid grid-cols-2 gap-4">
			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Medicin i dag</p>
				<p class="text-xl font-semibold text-gray-800">Taget</p>
				<p class="text-sm text-gray-600 mt-2">Opdateret kl. 08:00</p>
			</div>

			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Humør i dag</p>
				<p class="text-xl font-semibold text-gray-800">7/10</p>
				<p class="text-sm text-gray-600 mt-2">Opdateret kl. 14:32</p>
			</div>
		</div>
	</div>

	<!-- Medicin -->
	<button
		class="bg-white border border-gray-400 rounded p-5 text-left hover:bg-[#eef7ec] transition flex flex-col overflow-hidden"
		onclick={goToMedicine}
	>
		<h2 class="text-3xl font-semibold text-gray-800 mb-6">Medicin</h2>

		<div class="space-y-4">
			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Seneste registrering</p>
				<p class="text-xl font-semibold text-gray-800">Penicillin</p>
				<p class="text-sm text-gray-600 mt-1">1 tablet · kl. 08:00</p>
			</div>

			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Status</p>
				<p class="text-xl font-semibold text-gray-800">Taget i dag</p>
			</div>

			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Historik</p>
				<p class="text-xl font-semibold text-gray-800">Se tidligere registreringer</p>
			</div>
		</div>

		<div class="mt-auto pt-5">
			<div class="w-full bg-[#7fae7b] text-white rounded px-4 py-3 text-center font-semibold">
				Åbn medicinside
			</div>
		</div>
	</button>

	<!-- Mood -->
	<button
		class="bg-white border border-gray-400 rounded p-5 text-left hover:bg-[#eef7ec] transition flex flex-col overflow-hidden"
		onclick={goToMood}
	>
		<h2 class="text-3xl font-semibold text-gray-800 mb-6">Mood</h2>

		<div class="space-y-4">
			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Seneste registrering</p>
				<p class="text-xl font-semibold text-gray-800">7/10</p>
				<p class="text-sm text-gray-600 mt-1">I dag kl. 14:32</p>
			</div>

			<div class="border border-gray-300 rounded p-4 bg-[#f8fbf7]">
				<p class="text-sm text-gray-500 mb-1">Historik</p>
				<p class="text-xl font-semibold text-gray-800">Se tidligere humørregistreringer</p>
			</div>
		</div>

		<div class="mt-auto pt-5">
			<div class="w-full bg-[#7fae7b] text-white rounded px-4 py-3 text-center font-semibold">
				Åbn moodside
			</div>
		</div>
	</button>
</div>