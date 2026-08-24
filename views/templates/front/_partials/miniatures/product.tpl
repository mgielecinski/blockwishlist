{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 *}

<div class="js-product product{if !empty($productClasses)} {$productClasses}{/if}">
  <article class="product-miniature js-product-miniature" data-id-product="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}">
    <div class="thumbnail-container">
      <div class="thumbnail-top">
        {block name='product_thumbnail'}
          {if $product.cover}
            <a href="{$product.url}" class="thumbnail product-thumbnail">
              <picture>
                {if !empty($product.cover.bySize.home_default.sources.avif)}<source srcset="{$product.cover.bySize.home_default.sources.avif}" type="image/avif">{/if}
                {if !empty($product.cover.bySize.home_default.sources.webp)}<source srcset="{$product.cover.bySize.home_default.sources.webp}" type="image/webp">{/if}
                <img
                  src="{$product.cover.bySize.home_default.url}"
                  alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
                  loading="lazy"
                  data-full-size-image-url="{$product.cover.large.url}"
                  width="{$product.cover.bySize.home_default.width}"
                  height="{$product.cover.bySize.home_default.height}"
                />
              </picture>
            </a>
          {else}
            <a href="{$product.url}" class="thumbnail product-thumbnail">
              <picture>
                {if !empty($urls.no_picture_image.bySize.home_default.sources.avif)}<source srcset="{$urls.no_picture_image.bySize.home_default.sources.avif}" type="image/avif">{/if}
                {if !empty($urls.no_picture_image.bySize.home_default.sources.webp)}<source srcset="{$urls.no_picture_image.bySize.home_default.sources.webp}" type="image/webp">{/if}
                <img
                  src="{$urls.no_picture_image.bySize.home_default.url}"
                  loading="lazy"
                  width="{$urls.no_picture_image.bySize.home_default.width}"
                  height="{$urls.no_picture_image.bySize.home_default.height}"
                />
              </picture>
            </a>
          {/if}

          {if $product.show_availability && $product.availability_message}

            {if $product.availability == 'in_stock'}
              {assign 'availability_icon' 'E5CA'}
              {assign 'availability_color' 'success'}
            {elseif $product.availability == 'available' || $product.availability == 'last_remaining_items'}
              {assign 'availability_icon' 'E002'}
              {assign 'availability_color' 'warning'}
            {else}
              {assign 'availability_icon' 'E14B'}
              {assign 'availability_color' 'danger'}
            {/if}

            <p class="wishlist-product-availability">
              <i class="material-icons">&#x{$availability_icon};</i> {$product.availability_message}
            </p>
          {/if}
        {/block}

      </div>

      <div class="product-description">
        {block name='product_name'}
          {if $page.page_name == 'index'}
            <h3 class="h3 product-title"><a href="{$product.url}" content="{$product.url}">{$product.name|truncate:30:'...'}</a></h3>
          {else}
            <h2 class="h3 product-title"><a href="{$product.url}" content="{$product.url}">{$product.name|truncate:30:'...'}</a></h2>
          {/if}
        {/block}

        {block name='product_price_and_shipping'}
          {if $product.show_price}
            <div class="product-price-and-shipping">
              {if $product.has_discount}
                {hook h='displayProductPriceBlock' product=$product type="old_price"}

                <span class="regular-price" aria-label="{l s='Regular price' d='Shop.Theme.Catalog'}">{$product.regular_price}</span>
                {if $product.discount_type === 'percentage'}
                  <span class="discount-percentage discount-product">{$product.discount_percentage}</span>
                {elseif $product.discount_type === 'amount'}
                  <span class="discount-amount discount-product">{$product.discount_amount_to_display}</span>
                {/if}
              {/if}

              {hook h='displayProductPriceBlock' product=$product type="before_price"}

              <span class="price" aria-label="{l s='Price' d='Shop.Theme.Catalog'}">
                {capture name='custom_price'}{hook h='displayProductPriceBlock' product=$product type='custom_price' hook_origin='products_list'}{/capture}
                {if '' !== $smarty.capture.custom_price}
                  {$smarty.capture.custom_price nofilter}
                {else}
                  {$product.price}
                {/if}
              </span>

              {hook h='displayProductPriceBlock' product=$product type='unit_price'}

              {hook h='displayProductPriceBlock' product=$product type='weight'}
            </div>
          {/if}
        {/block}

        {block name='wishlist_product_details'}
          <div class="wishlist-product-details">
            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#wishlistProductDetails{$product.id_product}_{$product.id_product_attribute}" aria-expanded="false" aria-controls="wishlistProductDetails{$product.id_product}_{$product.id_product_attribute}">
              {l s='View details' d='Modules.Blockwishlist.Shop'}
            </button>

            <div class="collapse" id="wishlistProductDetails{$product.id_product}_{$product.id_product_attribute}">
              <div class="card card-body">
                <p class="wishlist-product-quantity">
                  <span>{l s='Quantity' d='Shop.Theme.Catalog'}:</span>
                  <span>{$product.wishlist_quantity}</span>
                </p>

                <div class="wishlist-product-combinations">
                  {if isset($product.attributes) && $product.attributes|@count > 0}
                    {foreach from=$product.attributes item=attribute}
                      <p class="wishlist-product-combinations-text">
                        <span>{$attribute.public_group}:</span>
                        <span>{$attribute.name}</span>
                      </p>
                    {/foreach}
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/block}

        <div class="wishlist-product-bottom">
          {if $product.customizable}
            <a 
              href="{$product.url}" 
              class="btn wishlist-product-addtocart btn-secondary"
            >
              {l s='Customize' d='Modules.Blockwishlist.Shop'}
            </a>
          {else}
            <a 
              {if !$product.add_to_cart_url }disabled="disabled{else}href="{$product.add_to_cart_url}{/if}"
              class="btn wishlist-product-addtocart"
              data-ps-product-id="{$product.id_product}" data-ps-product-attribute-id="{$product.id_product_attribute}"
              data-ps-wishlist-id="{$id}" data-ps-wishlist-quantity="{$product.wishlist_quantity}"
              rel="nofollow"
            >
              <i class="material-icons shopping-cart">shopping_cart</i>
              {l s='Add to cart' d='Shop.Theme.Actions'}
            </a>
          {/if}
        </div>
      </div>

    </div>
  </article>
</div>