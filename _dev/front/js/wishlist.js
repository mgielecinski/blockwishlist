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

const addToWishlistModal = $('#add-to-wislist-modal');
const confirmAddToWishlistModal = $('#confirm-add-to-wislist-modal');
const createWishlistModal = $('#add-new-wislist-modal');
const renameWishlistModal = $('#rename-wislist-modal');
const shareWishlistModal = $('#share-wislist-modal');
const deleteWishlistModal = $('#delete-wislist-modal');
const loginWishlistModal = $('#login-wislist-modal');

jQuery(document).ready(() => {
  const $ = jQuery;

  /* Add new wishlist */
  $('body').on('click', '#wishlist-create', (event) => {
    event.preventDefault();
    showCreateWishlistModal();
  });

  $('body').on('click', '#wishlist-create-and-add-product', (event) => {
    event.preventDefault();
    addToWishlistModal.modal('hide');
    createWishlistModal.find('form').data('ps-open-add-to-wishlist-modal', true);
    showCreateWishlistModal();
  });

  $('#create-wishlist-form').on('submit', ajaxSubmitCreateWishlistForm);

  createWishlistModal.on('hidden.bs.modal', () => {
    createWishlistModal.modal('hide');
    createWishlistModal.find('input').val('');
  });

  function showCreateWishlistModal() {
    createWishlistModal.modal('show');
  }

  function ajaxSubmitCreateWishlistForm(event) {
    event.preventDefault();

    $.post($(this).attr('action'), $(this).serialize(), (jsonData) => {
      if (jsonData) {
        if (jsonData.success) {
          showToast(jsonData.message, 'success');
          ajaxRefreshWishlistList();
          ajaxRefreshWishlistModalChoice();
        } else {
          showToast(jsonData.message, 'error');
        }
      } else {
        showToast('Unexpected error', 'error');
      }
    }).fail(() => {
      showToast('Unexpected error', 'error');
    });

    createWishlistModal.modal('hide');

    if ($(this).data('ps-open-add-to-wishlist-modal')) {
      showAddToWishlistModal();
    }
  }

  /* Add product to wishlist */

  $('body').on('click', '.wishlist-add-to', (event) => {
    event.preventDefault();
    showAddToWishlistModal();
  });

  function showAddToWishlistModal() {
    addToWishlistModal.modal('show');
  }

  $('body').on('click', '.wishlist__btn', function (event) {
    event.preventDefault();

    const wishlistId = $(this).data('ps-wishlist-id');

    ajaxAddProductToWishlist(wishlistId);
  });

  confirmAddToWishlistModal.on('hidden.bs.modal', () => {
    confirmAddToWishlistModal.modal('hide');
    confirmAddToWishlistModal.find('#go-to-wishlist').attr('href', '#');
    confirmAddToWishlistModal.find('#confirm-add-to-wishlist-text').text('');
  });

  /* Delete wishlist */
  $('body').on('click', '.wishlist-delete', function (event) {
    event.preventDefault();

    const wishlistId = $(this).data('ps-wishlist-id');
    showDeleteWishlistModal(wishlistId);
  });

  deleteWishlistModal.on('hidden.bs.modal', () => {
    deleteWishlistModal.modal('hide');
    deleteWishlistModal.find('#wishlist-delete-submit').data('ps-wishlist-id', '');
  });

  function showDeleteWishlistModal(wishlistId) {
    deleteWishlistModal.find('#wishlist-delete-submit').data('ps-wishlist-id', wishlistId);
    deleteWishlistModal.modal('show');
  }

  $('body').on('click', '#wishlist-delete-submit', function (event) {
    event.preventDefault();

    const payload = {
      params: {
        idWishList: $(this).data('ps-wishlist-id'),
      },
    };

    $.post(deleteWishlistUrl, payload, (jsonData) => {
      if (jsonData) {
        if (jsonData.success) {
          showToast(jsonData.message, 'success');
          ajaxRefreshWishlistList();
        } else {
          showToast(jsonData.message, 'error');
        }
      } else {
        showToast('Unexpected error', 'error');
      }
    }).fail(() => {
      showToast('Unexpected error', 'error');
    });

    deleteWishlistModal.modal('hide');
  });

  /* Rename wishlist */
  $('body').on('click', '.wishlist-rename', function (event) {
    event.preventDefault();

    const currentWishlistId = $(this).data('ps-wishlist-id');
    const currentWishlistName = $(this).data('ps-wishlist-name');
    showRenameWishlistModal(currentWishlistId, currentWishlistName);
  });

  $('#rename-wishlist-form').on('submit', ajaxSubmitRenameWishlistForm);

  renameWishlistModal.on('hidden.bs.modal', () => {
    renameWishlistModal.modal('hide');
    renameWishlistModal.find('#rename-wishlist-id').val('');
    renameWishlistModal.find('#rename-wishlist-name').val('');
  });

  function showRenameWishlistModal(currentId, currentName) {
    renameWishlistModal.find('#rename-wishlist-id').val(currentId);
    renameWishlistModal.find('#rename-wishlist-name').val(currentName);
    renameWishlistModal.modal('show');
  }

  function ajaxSubmitRenameWishlistForm(event) {
    event.preventDefault();

    $.post($(this).attr('action'), $(this).serialize(), (jsonData) => {
      if (jsonData) {
        if (jsonData.success) {
          showToast(jsonData.message, 'success');
          ajaxRefreshWishlistList();
        } else {
          showToast(jsonData.message, 'error');
        }
      } else {
        showToast('Unexpected error', 'error');
      }
    }).fail(() => {
      showToast('Unexpected error', 'error');
    });

    renameWishlistModal.modal('hide');
  }

  /* Share wishlist */
  $('body').on('click', '.wishlist-share', function (event) {
    event.preventDefault();

    const shareUrl = $(this).data('ps-share-url');
    showShareWishlistModal(shareUrl);
  });

  shareWishlistModal.on('hidden.bs.modal', () => {
    shareWishlistModal.modal('hide');
    shareWishlistModal.find('input').val('');
  });

  function showShareWishlistModal(shareUrl) {
    shareWishlistModal.find('input').val(shareUrl);
    shareWishlistModal.modal('show');
  }

  $(document).on('click', '#wishlist-share-url-copy', () => {
    const shareInput = $('#wishlist-share-url');

    shareInput.select();

    document.execCommand('copy');

    showToast('Skopiowano do schowka!', 'success');
  });

  /* Helpers */
  function ajaxRefreshWishlistModalChoice() {
    const wishlistListSimpleContainer = $('.wishlist-list-simple');

    $.post(getAllWishlistUrl, {params: {type: 'simple'}}, (jsonData) => {
      if (jsonData) {
        if (jsonData.success) {
          wishlistListSimpleContainer.replaceWith(jsonData.template);
        } else {
          showToast(jsonData.message, 'error');
        }
      } else {
        showToast('Unexpected error', 'error');
      }
    }).fail(() => {
      showToast('Unexpected error', 'error');
    });
  }

  function ajaxRefreshWishlistList() {
    const wishlistContainer = $('.wishlist-list');

    $.get(getAllWishlistUrl, (jsonData) => {
      if (jsonData) {
        if (jsonData.success) {
          wishlistContainer.replaceWith(jsonData.template);
        } else {
          showToast(jsonData.message, 'error');
        }
      } else {
        showToast('Unexpected error', 'error');
      }
    }).fail(() => {
      showToast('Unexpected error', 'error');
    });
  }

  function showToast(message, type = 'basic') {
    const toastElement = $('.wishlist-toast');
    const toastMessage = $('.wishlist-toast-text');

    toastMessage.text(message);
    toastElement.removeClass('basic success error');
    toastElement.addClass(type);
    toastElement.addClass('isActive');

    setTimeout(() => {
      toastElement.removeClass('isActive');
    }, 2500);
  }

  function ajaxRemoveProductFromWishlist() {
    const wishlistButton = $('.wishlist-in-progress');

    const payload = {
      params: {
        idWishList: wishlistButton.attr('data-ps-wishlist-id'),
        id_product: wishlistButton.attr('data-ps-product-id'),
        id_product_attribute: wishlistButton.attr('data-ps-product-attribute-id'),
      },
    };

    $.post(removeFromWishlistUrl, payload, (jsonData) => {
      if (jsonData) {
        if (jsonData.success) {
          showToast(jsonData.message, 'success');
          wishlistButton.removeAttr('data-ps-wishlist-id');
          wishlistButton.attr('data-ps-action', 'add');
          wishlistButton.find('i').text('favorite_border');

          if (typeof prestashop !== 'undefined' && prestashop.page.page_name === 'module-blockwishlist-view') {
            prestashop.emit('updateFacets', prestashop.urls.current_url);
          }
        } else {
          showToast(jsonData.message, 'error');
        }
      } else {
        showToast('Unexpected error', 'error');
      }
    }).fail(() => {
      showToast('Unexpected error', 'error');
    }).always(() => {
      wishlistButton.removeClass('wishlist-in-progress');
    });
  }

  function ajaxAddProductToWishlist(wishlistId) {
    const wishlistButton = $('.wishlist-in-progress');

    const payload = {
      params: {
        id_product: wishlistButton.attr('data-ps-product-id'),
        id_product_attribute: wishlistButton.attr('data-ps-product-attribute-id'),
        idWishList: wishlistId,
      },
    };

    $.post(addToWishlistModal.attr('data-add-wishlist-url'), payload, (jsonData) => {
      if (jsonData) {
        if (jsonData.success) {
        // clean up
          wishlistButton.attr('data-ps-wishlist-id', wishlistId);
          wishlistButton.attr('data-ps-action', 'remove');
          wishlistButton.find('i').text('favorite');

          // notify user
          /// showToast(jsonData.message, 'success');
          confirmAddToWishlistModal.find('#go-to-wishlist').attr('href', jsonData.wishlistLink);
          confirmAddToWishlistModal.find('#confirm-add-to-wishlist-text').text(jsonData.message);
          confirmAddToWishlistModal.modal('show');
        } else {
          showToast(jsonData.message, 'error');
        }
      } else {
        showToast('Unexpected error', 'error');
      }
    }).fail(() => {
      showToast('Unexpected error', 'error');
    }).always(() => {
      wishlistButton.removeClass('wishlist-in-progress');
      addToWishlistModal.modal('hide');
    });
  }

  function ajaxAddProductToCartFromWishlist(productId, productAttributeId, wishlistId, wishlistQuantity) {
    console.log([productId, productAttributeId, wishlistId, wishlistQuantity]);
    const payloadAddToCart = {
      id_customization: 0,
      id_product: productId,
      id_product_attribute: productAttributeId,
      quantity: wishlistQuantity,
      action: 'update',
      add: 1,
      token: prestashop.static_token,
    };

    $.post(prestashop.urls.pages.cart, payloadAddToCart, null, 'json')
      .then((resp) => {
        if (resp) {
          prestashop.emit('updateCart', {
            reason: {
              idProduct: productId,
              idProductAttribute: productAttributeId,
              idCustomization: 0,
              linkAction: 'add-to-cart',
            },
            resp,
          });

          const payload = {
            params: {
              idWishlist: wishlistId,
              id_product: productId,
              id_product_attribute: productAttributeId,
              quantity: wishlistQuantity,
            },
          };

          $.post(wishlistAddProductToCartUrl, payload, null, 'json')
            .then((resp2) => {
              if (resp2) {
                showToast('Successful', 'error');
              } else {
                showToast('Unexpected error', 'error');
              }
            }).fail(() => {
              showToast('Unexpected error', 'error');
            }).always(() => {
              // wishlistButton.removeClass('wishlist-in-progress');
            });
        } else {
          showToast('Unexpected error', 'error');
        }
      }).fail(() => {
        showToast('Unexpected error', 'error');
      }).always(() => {
        // wishlistButton.removeClass('wishlist-in-progress');
      });
  }

  const initButtons = () => {
  // Pobieramy produkty jako kolekcję jQuery
    $('.js-product-miniature').each(function () {
      const $product = $(this);
      let isProductInWishlist = false;

      // Tworzymy przycisk z klasą
      const $wishlistButton = $('<button>', {class: 'wishlist-button-add'});

      if (prestashop.customer.is_logged) {
      // Pobieramy dane z dataset (jQuery automatycznie parsuje liczby w .data())
        const currentId = parseInt($product.data('id-product'), 10);
        const currentAttrId = parseInt($product.data('id-product-attribute'), 10) || 0;

        isProductInWishlist = productsAlreadyTagged.find(
          (item) => item.id_product === currentId && item.id_product_attribute === currentAttrId,
        );

        // Ustawiamy atrybuty data-
        $wishlistButton.attr({
          'data-ps-product-id': currentId,
          'data-ps-product-attribute-id': currentAttrId,
        });

        if (isProductInWishlist) {
          $wishlistButton.attr('data-ps-wishlist-id', isProductInWishlist.id_wishlist);
          console.log(isProductInWishlist);
          $wishlistButton.attr('data-ps-product-name', isProductInWishlist.name);
        }
      }

      // Ustawiamy akcję w zależności od statusu
      $wishlistButton.attr('data-ps-action', isProductInWishlist ? 'remove' : 'add');

      // Tworzymy ikonę Material Icons z odpowiednim tekstem i wrzucamy do przycisku
      const iconText = isProductInWishlist ? 'favorite' : 'favorite_border';
      const $icon = $('<i>', {class: 'material-icons', text: iconText});
      $wishlistButton.append($icon);

      // Wrzucamy gotowy przycisk do kontenera w produkcie
      $product.find('.thumbnail-container').append($wishlistButton);
    });
  };

  const initProductButton = () => {
  // Pobieramy produkty jako kolekcję jQuery
    const productWishlistButton = $('.wishlist-button-product');

    if (prestashop.customer.is_logged) {
    // Pobieramy dane z dataset (jQuery automatycznie parsuje liczby w .data())
      const currentId = parseInt(productWishlistButton.attr('data-ps-product-id'), 10);
      const currentAttrId = parseInt(productWishlistButton.attr('data-ps-product-attribute-id'), 10) || 0;

      const isProductInWishlist = productsAlreadyTagged.find(
        (item) => item.id_product === currentId && item.id_product_attribute === currentAttrId,
      );

      if (isProductInWishlist) {
        productWishlistButton.attr('data-ps-wishlist-id', isProductInWishlist.id_wishlist);
      }
      // Ustawiamy akcję w zależności od statusu
      productWishlistButton.attr('data-ps-action', isProductInWishlist ? 'remove' : 'add');
      // Tworzymy ikonę Material Icons z odpowiednim tekstem i wrzucamy do przycisku
      const iconText = isProductInWishlist ? 'favorite' : 'favorite_border';
      productWishlistButton.find('i').text(iconText);
    }
  };

  // All ready - go go go
  initButtons();
  initProductButton();
  ajaxRefreshWishlistModalChoice();

  // 3. Wpinasz się w globalny obiekt zdarzeń PrestaShop (dla Ajaxu)
  if (typeof prestashop !== 'undefined') {
    // Zdarzenie wywoływane po aktualizacji listy produktów (filtry, paginacja, sortowanie)
    prestashop.on('updateProductList', () => {
      // Opóźniamy wykonanie o minimalny ułamek sekundy (setTimeout 0),
      // aby upewnić się, że PrestaShop zdążył już wstrzyknąć nowy HTML do DOM
      setTimeout(() => {
        initButtons();
      }, 50);
    });

    // Nasłuchiwanie zmiany kombinacji/atrybutów na stronie produktu
    prestashop.on('updatedProduct', (event) => {
      const productAttributeId = event.id_product_attribute;

      const productWishlistButton = $('.wishlist-button-product');
      productWishlistButton.removeAttr('data-ps-wishlist-id');
      productWishlistButton.removeAttr('data-ps-action');
      productWishlistButton.attr('data-ps-product-attribute-id', productAttributeId);

      // Opóźnienie, aby PrestaShop zdążył wstrzyknąć nowy HTML z nowymi danymi kombinacji
      setTimeout(() => {
        // Ponownie inicjalizujemy przyciski dla nowo załadowanego HTML-u
        initProductButton();
      }, 50);
    });
  }

  $(document).on('click', '.wishlist-button-add', function (event) {
    event.preventDefault();

    if (!prestashop.customer.is_logged) {
      loginWishlistModal.modal('show');
      return; // zatrzymujemy dalsze wykonanie, jeśli użytkownik nie jest zalogowany
    }

    $(this).addClass('wishlist-in-progress');

    if ($(this).attr('data-ps-action') === 'remove') {
      ajaxRemoveProductFromWishlist();
    } else {
      addToWishlistModal.modal('show');
    }
  });

  $('body').on('click', '.wishlist-product-addtocart', function (event) {
    event.preventDefault();

    const productId = $(this).data('ps-product-id');
    const productAttributeId = $(this).data('ps-product-attribute-id');
    const wishlistId = $(this).data('ps-wishlist-id');
    const wishlistQuantity = $(this).data('ps-wishlist-quantity');

    ajaxAddProductToCartFromWishlist(productId, productAttributeId, wishlistId, wishlistQuantity);
  });
});
