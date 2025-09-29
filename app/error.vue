<template>
  <UApp>
    <AppHeader />

    <UError
      redirect="/"
      :error="{
        statusCode: 404,
        statusMessage: 'Page introuvable',
        message: 'La page que vous recherchez n\'existe pas.',
      }"
      :clear="{
        icon: 'material-symbols:arrow-left-alt-rounded',
      }"
    />
  </UApp>
</template>
