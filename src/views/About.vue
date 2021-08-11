<template>

    <div class="about w-full mb-4 p-8 bg-white shadow rounded-lg">

        <h1 class="mb-2 inline-block text-3xl font-extrabold text-gray-900 tracking-tight">
            About
        </h1>

        <p class="mb-4">
            I started this project with two objectives in mind. The first one was to create an alternative interface for <a
            class="underline hover:textDecoration"
            href="http://hypothes.is/" target="_blank"
            rel="noopener noreferrer">
            hypotes.is</a>. I use this service on a daily basis and I wanted a better way to visualize and edit my annotations. Happily, they provide a good <a
            class="underline hover:textDecoration"
            href="https://h.readthedocs.io/en/latest/api-reference/v1/ " target="_blank"
            rel="noopener noreferrer">
            API</a>  that allowed the development of this tool.
        </p>

        <p class="mb-4">
            The second objective was to learn more about Vue and compare it with my knowledge about React. So far has been a great experience, I founded it to be easier to implement and understand.
            This project is open-source, and I want you to feel free to send your suggestions and features requests over the GitHub page. 
        </p>  

        <p class="mb-4">
            If this tool helped you in some way, feel free to make a donation.
        </p>

        <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="business" value="RVY28898Q7RCG" />
            <input type="hidden" name="no_recurring" value="0" />
            <input type="hidden" name="currency_code" value="USD" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img class="inline" alt="" border="0" src="https://www.paypal.com/en_BR/i/scr/pixel.gif" width="1" height="1" />
        </form>

    </div>
    
</template>
