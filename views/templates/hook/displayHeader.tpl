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

{if $logged}
  {include file="module:blockwishlist/views/templates/front/modals/create.tpl" createUrl=$createUrl}
  {include file="module:blockwishlist/views/templates/front/modals/add-to-wishlist.tpl" url=$url addUrl=$addUrl newWishlistCTA=$newWishlistCTA}
  {include file="module:blockwishlist/views/templates/front/modals/confirm-add-to-wishlist.tpl"}
  {include file="module:blockwishlist/views/templates/front/modals/delete.tpl" listUrl=$deleteListUrl productUrl=$deleteProductUrl}
  {include file="module:blockwishlist/views/templates/front/modals/rename.tpl"}
  {include file="module:blockwishlist/views/templates/front/modals/share.tpl"}
  {include file="module:blockwishlist/views/templates/front/toast.tpl"}
{else}
  {include file="module:blockwishlist/views/templates/front/modals/login.tpl"}
{/if}
