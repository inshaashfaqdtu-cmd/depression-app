<script>
	import '../app.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { children } = $props();

	function logout() {
		goto('/');
	}

	function navClass(path) {
		const active = page.url.pathname === path;

		return active
			? 'w-full border border-[#7fae7b] bg-[#7fae7b] text-white rounded px-3 py-3 text-left text-sm font-medium'
			: 'w-full border border-gray-400 bg-white text-gray-800 rounded px-3 py-3 text-left text-sm hover:bg-gray-100';
	}
</script>

<div class="min-h-screen bg-[#cfe3c4] p-4">
	<div class="w-full min-h-[92vh] bg-[#f4f4f4] border border-gray-400 rounded-md flex">
		<div class="w-44 border-r border-gray-400 p-3 flex flex-col justify-between">
			<div class="space-y-3">
				<button class={navClass('/home')} onclick={() => goto('/home')}>
					Status
				</button>

				<button class={navClass('/mood')} onclick={() => goto('/mood')}>
					Mood
				</button>

				<button class={navClass('/medicin')} onclick={() => goto('/medicin')}>
					Medicin
				</button>
			</div>

			<div class="space-y-3">
				<button class={navClass('/brugerinfo')} onclick={() => goto('/brugerinfo')}>
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