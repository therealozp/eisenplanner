<div class="eisengrid-main grid w-screen grid-cols-2 grid-rows-2">
	<slot name="urgent_important"></slot>
	<slot name="not_urgent_important"></slot>
	<slot name="urgent_not_important"></slot>
	<slot name="not_urgent_not_important"></slot>
</div>

<style>
	.eisengrid-main {
		height: calc(100vh - 64px);
	}
</style>
