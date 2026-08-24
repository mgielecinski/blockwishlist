{**
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
 *}
{extends file='catalog/listing/product-list.tpl'}

{block name='product_list_header'}
  <header class="page-header wishlist-list-header">
    <h1>{$listing.label}</h1>
    <div class="wishlist-header-actions">
      <button type="button" id="wishlist-remove-all-btn" class="btn btn-link text-danger">
        <i class="material-icons" aria-hidden="true">delete</i> {l s='Remove all' d='Modules.Blockwishlist.Shop'}
      </button>
      <button type="button" id="wishlist-buy-all-btn" class="btn btn-link text-primary">
        <i class="material-icons" aria-hidden="true">add_shopping_cart</i> {l s='Buy all' d='Modules.Blockwishlist.Shop'}
      </button>
    </div>
  </header>
{/block}

{block name="error_content"}
  <p class="wishlist-list-empty">{l s='No products found' d='Modules.Blockwishlist.Shop'}</p>
{/block}

{block name='product_list'}
  {include file='module:blockwishlist/views/templates/front/_partials/products.tpl' listing=$listing}
{/block}

{block name='product_list_footer'}
  <div class="wishlist-footer-links">
    <a href="{$wishlistsLink}"><i class="material-icons">chevron_left</i>{l s='Return to wishlists' d='Modules.Blockwishlist.Shop'}</a>
    <a href="{$urls.base_url}"><i class="material-icons">home</i>{l s='Home' d='Shop.Theme.Global'}</a>
  </div>
{/block}
