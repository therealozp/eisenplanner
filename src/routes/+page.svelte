<script>
	import ChatBox from '$lib/components/chat/ChatBox.svelte';
	import MatrixPage from '$lib/components/matrix/MatrixPage.svelte';
	import Navbar from '$lib/components/navigation/Navbar.svelte';
</script>

<head>
	<title>EisenPlanner</title>
</head>
<div class="h-screen overflow-hidden">
	<Navbar />
	<MatrixPage />
	<ChatBox />
</div>
