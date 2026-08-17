<!--**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 *-->
<template>
  <div
    class="wishlist-toast"
    :class="[{ isActive: active }, type]"
  >
    <p class="wishlist-toast-text">
      {{ text }}
    </p>
  </div>
</template>

<script>
  import EventBus from '@components/EventBus';

  export default {
    name: 'Button',
    props: {
      renameWishlistText: {
        type: String,
        required: true,
      },
      addedWishlistText: {
        type: String,
        required: true,
      },
      deleteWishlistText: {
        type: String,
        required: true,
      },
      createWishlistText: {
        type: String,
        required: true,
      },
      deleteProductText: {
        type: String,
        required: true,
      },
      copyText: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        text: '',
        active: false,
        timeout: null,
        type: 'basic',
      };
    },
    mounted() {
      /**
       * Register to an even so every components can show toast
       */
      EventBus.$on('showToast', (event) => {
        if (event.detail.message) {
          if (this[event.detail.message]) {
            this.text = this[event.detail.message];
          } else {
            this.text = event.detail.message;
          }
        }

        this.active = true;

        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
          this.active = false;
          this.timeout = null;
        }, 2500);

        this.type = event.detail.type ? event.detail.type : 'basic';
      });
    },
  };
</script>
