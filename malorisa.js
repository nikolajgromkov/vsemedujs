var CONFIG = {
    sushiProducts: ['Комбо Нешуточное', 'Мини Комбо', 'Dragon Crazy', 'Lovely Ролл', 'Salmon Crazy', 'Salmon Спайси', 'Special Ролл', 'Ролл Джусто', 'Миндаль Ролл', 'Ролл Дуэт', 'Сет 2 половинки 16 шт', 'Сет Император 32 шт', 'Филадельфия с гребешком', 'Эби Crazy', 'Ролл Orange Gold', 'Red and Black', 'Балтимор', 'Бостон', 'Вулкан', 'Грин маки', 'Дракон', 'Енако', 'Зеленый Дракон', 'Инари', 'Калифорния с лососем', 'Калифорния с угрем', 'Канада', 'Канадский', 'Классика', 'Классическая калифорния', 'Красный дракон', 'Лава', 'Лава Сяке', 'Люкс ролл', 'Маруяки', 'Мини с крабом', 'Мини с креветкой', 'Мини с лососем', 'Мини с огурцом', 'Мини с угрем', 'Нагано', 'Овощной', 'Пирамида', 'Самурай', 'Сливочный', 'Калифорния с креветкой', 'Суши с креветкой', 'Ролл Аляска', 'Суши с лососем', 'Филадельфия с зеленым луком', 'Суши с угрем', 'Токио люкс', 'Тортилья с курицей', 'Тортилья с лососем', 'Филадельфия', 'Филадельфия в кунжуте', 'Филадельфия с авокадо', 'Филадельфия с огурцом', 'Филадельфия с угрем', 'Фреш маки', 'Фудзи', 'Фьюжн', 'Черный дракон', 'Чикаго', 'Шахматы', 'Юми', 'Якудза','Запеченная Классика', 'Каговаси', 'Калифорния Яки', 'Классика в темпуре', 'Мито Темпура', 'Москва', 'Ролл Чикен Hot', 'Сан-Ремо', 'Семга Темпура', 'Калифорния темпура', 'Тартар Ролл', 'Темпура', 'Теплый овощной', 'Теплый с крабом', 'Томаго', 'Тортилья Темпура', 'Филадельфия Темпура', 'Филадельфия Яки', 'Фурай Темпура', 'Хаманиши', 'Цезарь Ролл', 'Эби Moscow', 'Эби Темпура', 'Яки Ика Маки', 'Яки Тори Маки', 'Яки Ширу Маки', 'Яки Эби Маки', 'Ямайка','Сет Вторая волна 64 шт', 'Сет Горячий 24 шт', 'Сет Де Люкс 24 шт', 'Сет Запеченный 32 шт', 'Сет Майский 50 шт', 'Сет Мартовский 64 шт', 'Сет Теплый 48 шт', 'Сет Токуяма 40 шт', 'Сет Филадельфия 34 шт', 'Сет Фреш 24 шт', 'Сет Хит 24 шт', 'Сет Школьный 56 шт'],
    requiredSauces: ['Васаби', 'Имбирь', 'Соевый соус', 'палочки'],
    highlightClass: 'highlight-section',
    highlightDuration: 5000,
    checkoutPath: '/checkout',
    sectionTitle: 'Не забудьте добавить к роллам'
  };
  
  function isCheckoutPage() {
    return window.location.pathname.indexOf(CONFIG.checkoutPath) !== -1;
  }
  
  function findRequiredSection() {
    if (!isCheckoutPage()) return null;
    
    var headings = Array.prototype.slice.call(document.querySelectorAll('h2, h3'));
    var targetHeading = null;
    
    for (var i = 0; i < headings.length; i++) {
      var heading = headings[i];
      var text = heading.textContent ? heading.textContent.trim().toLowerCase() : '';
      if (text.indexOf('добавить к роллам') !== -1) {
        targetHeading = heading;
        break;
      }
    }
    
    return targetHeading ? targetHeading.closest('div.space-y-3, section') : null;
  }
  
  function addStyles() {
    var styleId = 'cart-validation-styles';
    if (document.getElementById(styleId)) return;
  
    var style = document.createElement('style');
    style.id = styleId;
    style.textContent = 
      '.cart-error-message {' +
      '  color: #ef4444;' +
      '  background: #fee2e2;' +
      '  padding: 16px;' +
      '  border-radius: 8px;' +
      '  margin: 16px 0;' +
      '  animation: fadeIn 0.3s ease-out;' +
      '}' +
      '.cart-error-message h3 {' +
      '  font-weight: bold;' +
      '  margin-bottom: 8px;' +
      '  font-size: 1.1rem;' +
      '}' +
      '.cart-error-message ul {' +
      '  margin: 8px 0;' +
      '  padding-left: 20px;' +
      '}' +
      '.cart-error-message li {' +
      '  margin-bottom: 4px;' +
      '}' +
      '.submit-disabled {' +
      '  opacity: 0.7 !important;' +
      '  cursor: not-allowed !important;' +
      '  background-color: #e5e7eb !important;' +
      '}' +
      '.' + CONFIG.highlightClass + ' {' +
      '  animation: highlight-pulse 1s infinite;' +
      '  border-radius: 0.5rem;' +
      '}' +
      '@keyframes fadeIn {' +
      '  from { opacity: 0; transform: translateY(-10px); }' +
      '  to { opacity: 1; transform: translateY(0); }' +
      '}' +
      '@keyframes highlight-pulse {' +
      '  0% { box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.7); }' +
      '  70% { box-shadow: 0 0 0 10px rgba(255, 59, 48, 0); }' +
      '  100% { box-shadow: 0 0 0 0 rgba(255, 59, 48, 0); }' +
      '}';
    
    document.head.appendChild(style);
  }
  
  function hasProductsFromList(items, list) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i].toLowerCase();
      for (var j = 0; j < list.length; j++) {
        if (item.indexOf(list[j].toLowerCase()) !== -1) {
          return true;
        }
      }
    }
    return false;
  }
  
  function highlightSection(section, shouldHighlight) {
    if (!section) return;
    
    if (shouldHighlight) {
      section.classList.add(CONFIG.highlightClass);
      setTimeout(function() {
        section.classList.remove(CONFIG.highlightClass);
      }, CONFIG.highlightDuration);
    } else {
      section.classList.remove(CONFIG.highlightClass);
    }
  }
  
  function createErrorMessage() {
    var message = document.createElement('div');
    message.className = 'cart-error-message';
    message.innerHTML = 
      '<h3>Не забудьте добавить!</h3>' +
      '<p>Соевый соус, имбирь, васаби и палочки теперь нужно добавить в корзину самостоятельно.</p>';
    return message;
  }
  
  function checkRequirements() {
    if (!isCheckoutPage()) return;
  
    var cartItemsElements = document.querySelectorAll('[class*="py-4"]');
    var cartItems = [];
    
    for (var i = 0; i < cartItemsElements.length; i++) {
      var itemText = cartItemsElements[i].querySelector('.leading-none');
      if (itemText && itemText.textContent) {
        cartItems.push(itemText.textContent.trim());
      }
    }
  
    var hasSushi = hasProductsFromList(cartItems, CONFIG.sushiProducts);
    var hasSauces = hasProductsFromList(cartItems, CONFIG.requiredSauces);
    
    var showWarning = hasSushi && !hasSauces;
    
    var submitButton = document.querySelector('button[type="submit"]');
    var errorMessage = document.querySelector('.cart-error-message');
    var requiredSection = findRequiredSection();
  
    if (!requiredSection || !submitButton) return;
  
    if (showWarning) {
      submitButton.disabled = true;
      submitButton.classList.add('submit-disabled');
      
      if (!errorMessage) {
        var message = createErrorMessage();
        requiredSection.appendChild(message);
      }
      
      highlightSection(requiredSection, true); 
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove('submit-disabled');
      if (errorMessage) {
        requiredSection.removeChild(errorMessage);
      }
      highlightSection(requiredSection, false);
    }
  }
  
  function initObserver() {
    var observer = new MutationObserver(function() {
      checkRequirements();
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  function initCartValidation() {
    if (!isCheckoutPage()) return;
    
    try {
      addStyles();
      
      function checkElements() {
        var section = findRequiredSection();
        var submitButton = document.querySelector('button[type="submit"]');
        
        if (!section || !submitButton) {
          setTimeout(checkElements, 500);
          return;
        }
  
        checkRequirements();
        initObserver();
      }
  
      checkElements();
    } catch (error) {
      console.error('Cart validation error:', error);
    }
  }
  
  function startValidation() {
    if (document.readyState === 'complete') {
      initCartValidation();
    } else {
      window.addEventListener('load', initCartValidation);
      document.addEventListener('DOMContentLoaded', initCartValidation);
    }
  
    setTimeout(initCartValidation, 1000);
    setTimeout(initCartValidation, 3000);
  }
  
  startValidation();