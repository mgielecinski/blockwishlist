<div id="add-new-wislist-modal" class="wishlist-modal modal fade" tabindex="-1" role="dialog" aria-labelledby="addNewWishlistModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addNewWishlistModalTitle">{l s='Create wishlist' d='Modules.Blockwishlist.Shop'}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="{l s='Close' d='Shop.Theme.Global'}">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="create-wishlist-form" action="{$createUrl}" method="POST">
          <div class="form-group form-group-lg">
            <label for="create-wishlist-name" class="form-control-label">{l s='Wishlist name' d='Modules.Blockwishlist.Shop'}</label>
            <input type="text" id="create-wishlist-name" name="params[name]" placeholder="{l s='Add name' d='Modules.Blockwishlist.Shop'}" class="form-control form-control-lg">
          </div>
          <div class="mt-2">
            <button type="button" data-dismiss="modal" class="modal-cancel btn btn-secondary">{l s='Cancel' d='Modules.Blockwishlist.Shop'}</button>
            <button type="submit" class="btn btn-primary">{l s='Create wishlist' d='Modules.Blockwishlist.Shop'}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
