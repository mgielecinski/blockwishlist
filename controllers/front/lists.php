<?php
/**
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
 */
class BlockWishlistListsModuleFrontController extends ModuleFrontController
{
    /**
     * @var bool If set to true, will be redirected to authentication page
     */
    public $auth = true;

    public function initContent()
    {
        parent::initContent();

        $this->context->smarty->assign(
          [
              'url' => $this->context->link->getModuleLink('blockwishlist', 'action', ['action' => 'getAllWishlist']),
              'renameUrl' => $this->context->link->getModuleLink('blockwishlist', 'action', ['action' => 'renameWishlist']),
              'shareUrl' => $this->context->link->getModuleLink('blockwishlist', 'action', ['action' => 'getUrlByIdWishlist']),
              'accountLink' => '#',
              'wishlistsTitlePage' => Configuration::get('blockwishlist_WishlistPageName', $this->context->language->id),
              'newWishlistCTA' => Configuration::get('blockwishlist_CreateButtonLabel', $this->context->language->id),
              'wishlists' => $this->getAllWishList(),
          ]
        );

        $this->setTemplate('module:blockwishlist/views/templates/front/lists.tpl');
    }

    private function getAllWishList()
    {
        $wishlists = WishList::getAllWishListsByIdCustomer($this->context->customer->id);
        if (empty($wishlists)) {
            $wishlist = new WishList();
            $wishlist->id_shop = $this->context->shop->id;
            $wishlist->id_shop_group = $this->context->shop->id_shop_group;
            $wishlist->id_customer = $this->context->customer->id;
            $wishlist->name = Configuration::get('blockwishlist_WishlistDefaultTitle', $this->context->language->id);
            $wishlist->token = $this->generateWishListToken();
            $wishlist->default = 1;
            $wishlist->add();

            $wishlists = WishList::getAllWishListsByIdCustomer($this->context->customer->id);
        }

        foreach ($wishlists as $key => $wishlist) {
            $wishlists[$key]['shareUrl'] = $this->context->link->getModuleLink('blockwishlist', 'view', ['token' => $wishlist['token']]);
            $wishlists[$key]['listUrl'] = $this->context->link->getModuleLink('blockwishlist', 'view', ['id_wishlist' => $wishlist['id_wishlist']]);
        }

        return $wishlists;
    }

    private function generateWishListToken()
    {
        return strtoupper(substr(sha1(uniqid((string) rand(), true) . _COOKIE_KEY_ . $this->context->customer->id), 0, 16));
    }

    public function getBreadcrumbLinks()
    {
        $breadcrumb = parent::getBreadcrumbLinks();

        $breadcrumb['links'][] = $this->addMyAccountToBreadcrumb();
        $breadcrumb['links'][] = [
          'title' => Configuration::get('blockwishlist_WishlistPageName', $this->context->language->id),
          'url' => $this->context->link->getModuleLink('blockwishlist', 'lists'),
        ];

        return $breadcrumb;
    }
}
