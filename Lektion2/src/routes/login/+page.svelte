<script>
	import { goto } from '$app/navigation';

	let username = $state('');
	let password = $state('');

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();

		if (response.ok) {
			goto('/home');
		} else {
			alert(data.error || 'Login fejlet');
		}
	};

	function goToCreateUser() {
		goto('/opret-bruger');
	}
</script>

<div class="min-h-screen bg-[#cfe3c4] flex items-center justify-center">
	<div class="w-[360px] bg-[#f4f4f4] rounded-xl shadow-lg p-8">
		<h1 class="text-2xl font-semibold text-center mb-6">Login</h1>

		<input
			class="input input-bordered w-full mb-3 bg-white"
			type="text"
			placeholder="Indtast brugernavn"
			bind:value={username}
		/>

		<input
			class="input input-bordered w-full mb-5 bg-white"
			type="password"
			placeholder="Indtast password"
			bind:value={password}
		/>

		<button
			class="btn w-full bg-[#7fae7b] border-[#7fae7b] text-white mb-3"
			onclick={login}
		>
			Log ind
		</button>

		<button
			class="btn w-full bg-white border-gray-300 text-black hover:bg-gray-100"
			onclick={goToCreateUser}
		>
			Opret bruger
		</button>
	</div>
</div>