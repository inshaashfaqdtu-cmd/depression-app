<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { children } = $props();

	function goToHome() {
		goto('/home');
	}

	function goToMood() {
		goto('/mood');
	}

	function goToMedicine() {
		goto('/medicin');
	}

	function goToBrugerinfo() {
		goto('/brugerinfo');
	}

	function logout() {
		goto('/');
	}
</script>

<div class="min-h-screen bg-[#cfe3c4] p-4">
	<div class="w-full min-h-[92vh] bg-[#f4f4f4] border border-gray-400 rounded-md flex">
		<div class="w-44 border-r border-gray-400 p-3 flex flex-col justify-between">
			<div class="space-y-3">
				<button
					class="w-full rounded px-3 py-3 text-left text-sm border {page.url.pathname === '/home'
						? 'bg-[#8caf7d] text-white border-[#8caf7d] font-semibold'
						: 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100'}"
					onclick={goToHome}
				>
					Status
				</button>

				<button
					class="w-full rounded px-3 py-3 text-left text-sm border {page.url.pathname === '/mood'
						? 'bg-[#8caf7d] text-white border-[#8caf7d] font-semibold'
						: 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100'}"
					onclick={goToMood}
				>
					Mood
				</button>

				<button
					class="w-full rounded px-3 py-3 text-left text-sm border {page.url.pathname === '/medicin' || page.url.pathname === '/tilfoej-medicin'
						? 'bg-[#8caf7d] text-white border-[#8caf7d] font-semibold'
						: 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100'}"
					onclick={goToMedicine}
				>
					Medicin
				</button>
			</div>

			<div class="space-y-3">
				<button
					class="w-full rounded px-3 py-3 text-left text-sm border {page.url.pathname === '/brugerinfo'
						? 'bg-[#8caf7d] text-white border-[#8caf7d] font-semibold'
						: 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100'}"
					onclick={goToBrugerinfo}
				>
					Brugerinfo
				</button>

				<button
					class="w-full bg-red-600 text-white rounded px-3 py-3 font-semibold hover:bg-red-700"
					onclick={logout}
				>
					Log ud
				</button>
			</div>
		</div>

		<div class="flex-1 p-4">
			{@render children()}
		</div>
	</div>
</div>