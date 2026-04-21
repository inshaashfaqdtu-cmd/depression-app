<script>
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	function login() {
		if (email === 'admin@mail.com' && password === '1234') {
			goto('/home');
		} else {
			alert('Forkert email eller kode');
		}
	}
</script>

<div class="min-h-screen bg-[#cfe3c4] flex items-center justify-center">
	<div class="w-[360px] bg-[#f4f4f4] rounded-xl shadow-lg p-8">

		<h1 class="text-2xl font-semibold text-center mb-6">Login</h1>

		<input
			class="input input-bordered w-full mb-3 bg-white h-11"
			type="email"
			placeholder="Brugernavn"
			bind:value={email}
		/>

		<input
			class="input input-bordered w-full mb-5 bg-white h-11"
			type="password"
			placeholder="Adgangskode"
			bind:value={password}
		/>

		<button
			class="btn w-full mb-3 h-11 bg-[#7fae7b] border-[#7fae7b] text-white hover:bg-[#6b9a68] shadow-md"
			onclick={login}
		>
			Log ind
		</button>

		<button
			class="btn w-full h-11 bg-white border-gray-300 text-black hover:bg-gray-100"
		>
			Opret bruger
		</button>

	</div>
</div>