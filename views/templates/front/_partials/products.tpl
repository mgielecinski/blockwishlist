<div id="js-product-list">
  {include file="module:blockwishlist/views/templates/front/_partials/productlist.tpl" products=$listing.products cssClass="row" productClass="col-xs-12 col-sm-6 col-xl-3"}

  {block name='pagination'}
    {include file='_partials/pagination.tpl' pagination=$listing.pagination}
  {/block}

  <div class="hidden-md-up text-xs-right up">
    <a href="#header" class="btn btn-secondary">
      {l s='Back to top' d='Shop.Theme.Actions'}
      <i class="material-icons">&#xE316;</i>
    </a>
  </div>
</div>
