<ul class="wishlist-list">
  {foreach from=$wishlists item=wishlist name=wishlists}
    <li class="wishlist-list-item{if $wishlist.default} wishlist-list-item-default{/if}">
      <p class="wishlist-list-item-title">
        <a class="wishlist-list-item-link" href="{$wishlist.listUrl}">
          {$wishlist.name}<span>({$wishlist.nbProducts})</span>
        </a>
      </p>
      <div class="wishlist-list-item-right">
        {if $wishlist.default}
          <button type="button" class="wishlist-share wishlist-list-item-share" data-ps-share-url="{$wishlist.shareUrl}"><i class="material-icons">share</i></button>
        {else}
          <div class="dropdown">
            <button class="btn btn-unstyle dropdown-toggle wishlist-list-item-actions" type="button" id="wishListItemDropdownMenu{$smarty.foreach.wishlists.iteration}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="material-icons">more_vert</i>
            </button>
            <div class="dropdown-menu" aria-labelledby="wishListItemDropdownMenu{$smarty.foreach.wishlists.iteration}">
              <button class="dropdown-item wishlist-rename" type="button" data-ps-wishlist-id="{$wishlist.id_wishlist}" data-ps-wishlist-name="{$wishlist.name}">Zmień nazwę</button>
              <button class="dropdown-item wishlist-share" type="button" data-ps-share-url="{$wishlist.shareUrl}">Udostępnij</button>
            </div>
          </div>
          <button class="wishlist-delete" type="button" data-ps-wishlist-id="{$wishlist.id_wishlist}"><i class="material-icons">delete</i></button>
        {/if}
      </div>
    </li>
  {/foreach}
</ul>
