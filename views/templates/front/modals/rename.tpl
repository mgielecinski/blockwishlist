<div id="rename-wislist-modal" class="wishlist-modal modal fade" tabindex="-1" role="dialog" aria-labelledby="renameWishlistModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="renameWishlistModalTitle">{l s='Rename wishlist' d='Modules.Blockwishlist.Shop'}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="{l s='Close' d='Shop.Theme.Global'}">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="rename-wishlist-form" action="{$renameUrl}" method="POST">
          <div class="form-group form-group-lg">
            <input type="hidden" id="rename-wishlist-id" name="params[idWishList]">
            <label for="wishlist-name" class="form-control-label">{l s='Wishlist name' d='Modules.Blockwishlist.Shop'}</label>
            <input type="text" id="rename-wishlist-name" name="params[name]" class="form-control form-control-lg">
          </div>
          <div class="mt-2">
            <button type="button" data-dismiss="modal" class="modal-cancel btn btn-secondary">{l s='Cancel' d='Modules.Blockwishlist.Shop'}</button>
            <button type="submit" class="btn btn-primary">{l s='Rename wishlist' d='Modules.Blockwishlist.Shop'}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
