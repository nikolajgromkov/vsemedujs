const CONFIG = {
    sushiProducts: ['Комбо Нешуточное', 'Мини Комбо', 'Dragon Crazy', 'Lovely Ролл', 'Salmon Crazy', 'Salmon Спайси', 'Special Ролл', 'Ролл Джусто', 'Миндаль Ролл', 'Ролл Дуэт', 'Сет 2 половинки 16 шт', 'Сет Император 32 шт', 'Филадельфия с гребешком', 'Эби Crazy', 'Ролл Orange Gold', 'Red and Black', 'Балтимор', 'Бостон', 'Вулкан', 'Грин маки', 'Дракон', 'Енако', 'Зеленый Дракон', 'Инари', 'Калифорния с лососем', 'Калифорния с угрем', 'Канада', 'Канадский', 'Классика', 'Классическая калифорния', 'Красный дракон', 'Лава', 'Лава Сяке', 'Люкс ролл', 'Маруяки', 'Мини с крабом', 'Мини с креветкой', 'Мини с лососем', 'Мини с огурцом', 'Мини с угрем', 'Нагано', 'Овощной', 'Пирамида', 'Самурай', 'Сливочный', 'Калифорния с креветкой', 'Суши с креветкой', 'Ролл Аляска', 'Суши с лососем', 'Филадельфия с зеленым луком', 'Суши с угрем', 'Токио люкс', 'Тортилья с курицей', 'Тортилья с лососем', 'Филадельфия', 'Филадельфия в кунжуте', 'Филадельфия с авокадо', 'Филадельфия с огурцом', 'Филадельфия с угрем', 'Фреш маки', 'Фудзи', 'Фьюжн', 'Черный дракон', 'Чикаго', 'Шахматы', 'Юми', 'Якудза','Запеченная Классика', 'Каговаси', 'Калифорния Яки', 'Классика в темпуре', 'Мито Темпура', 'Москва', 'Ролл Чикен Hot', 'Сан-Ремо', 'Семга Темпура', 'Калифорния темпура', 'Тартар Ролл', 'Темпура', 'Теплый овощной', 'Теплый с крабом', 'Томаго', 'Тортилья Темпура', 'Филадельфия Темпура', 'Филадельфия Яки', 'Фурай Темпура', 'Хаманиши', 'Цезарь Ролл', 'Эби Moscow', 'Эби Темпура', 'Яки Ика Маки', 'Яки Тори Маки', 'Яки Ширу Маки', 'Яки Эби Маки', 'Ямайка','Сет Вторая волна 64 шт', 'Сет Горячий 24 шт', 'Сет Де Люкс 24 шт', 'Сет Запеченный 32 шт', 'Сет Майский 50 шт', 'Сет Мартовский 64 шт', 'Сет Теплый 48 шт', 'Сет Токуяма 40 шт', 'Сет Филадельфия 34 шт', 'Сет Фреш 24 шт', 'Сет Хит 24 шт', 'Сет Школьный 56 шт'],
    requiredSauces: ['Васаби', 'Имбирь', 'Соевый соус', 'палочки'],
    highlightClass: 'highlight-section',
    highlightDuration: 5000,
    checkoutPath: '/checkout',
    sectionTitle: 'Не забудьте добавить к роллам'
  };
  
  const isCheckoutPage = () => {
    return window.location.pathname.endsWith(CONFIG.checkoutPath);
  };
  
  const findRequiredSection = () => {
    if (!isCheckoutPage()) return null;
    
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    const targetHeading = headings.find(heading => {
      const text = heading.textContent?.trim().toLowerCase();
      return text && text.includes('добавить к роллам');
    });
    
    return targetHeading?.closest('div.space-y-3, section');
  };
  
  const addStyles = () => {
    const styleId = 'cart-validation-styles';
    if (document.getElementById(styleId)) return;
  
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .cart-error-message {
        color: #ef4444;
        background: #fee2e2;
        padding: 16px;
        border-radius: 8px;
        margin: 16px 0;
        animation: fadeIn 0.3s ease-out;
      }
      .cart-error-message h3 {
        font-weight: bold;
        margin-bottom: 8px;
        font-size: 1.1rem;
      }
      .cart-error-message ul {
        margin: 8px 0;
        padding-left: 20px;
      }
      .cart-error-message li {
        margin-bottom: 4px;
      }
      .submit-disabled {
        opacity: 0.7 !important;
        cursor: not-allowed !important;
        background-color: #e5e7eb !important;
      }
      .${CONFIG.highlightClass} {
        animation: highlight-pulse 1s infinite;
        border-radius: 0.5rem;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes highlight-pulse {
        0% { box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(255, 59, 48, 0); }
        100% { box-shadow: 0 0 0 0 rgba(255, 59, 48, 0); }
      }
    `;
    document.head.appendChild(style);
  };
  
  
  const hasProductsFromList = (items, list) => {
    return items.some(item => 
      list.some(product => item.toLowerCase().includes(product.toLowerCase())))
  };
  
  
  const highlightSection = (section, shouldHighlight) => {
    if (!section) return;
    
    if (shouldHighlight) {
      section.classList.add(CONFIG.highlightClass);
      setTimeout(() => {
        section.classList.remove(CONFIG.highlightClass);
      }, CONFIG.highlightDuration);
    } else {
      section.classList.remove(CONFIG.highlightClass);
    }
  };
  
  const createErrorMessage = () => {
    const message = document.createElement('div');
    message.className = 'cart-error-message';
    message.innerHTML = `
      <h3>Не забудьте добавить!</h3>
          <p>Соевый соус, имбирь, васаби палочки теперь нужно добавить в корзину самостоятельно.</p>
    `;
    return message;
  };
  
  const checkRequirements = () => {
    if (!isCheckoutPage()) return;
  
    const cartItems = Array.from(document.querySelectorAll('[class*="py-4"]'))
      .map(item => item.querySelector('.leading-none')?.textContent?.trim())
      .filter(Boolean);
  
    const hasSushi = hasProductsFromList(cartItems, CONFIG.sushiProducts);
    const hasSauces = hasProductsFromList(cartItems, CONFIG.requiredSauces);
    
    const showWarning = hasSushi && !hasSauces;
    
    const submitButton = document.querySelector('button[type="submit"]');
    const errorMessage = document.querySelector('.cart-error-message');
    const requiredSection = findRequiredSection();
  
    if (!requiredSection || !submitButton) return;
  
    if (showWarning) {
      submitButton.disabled = true;
      submitButton.classList.add('submit-disabled');
      
      if (!errorMessage) {
        const message = createErrorMessage();
        requiredSection.appendChild(message);
      }
      
      highlightSection(requiredSection, true); 
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove('submit-disabled');
      if (errorMessage) errorMessage.remove();
      highlightSection(requiredSection, false);
    }
  };
  
  const initObserver = () => {
    const observer = new MutationObserver(() => {
      checkRequirements();
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };
  
  const initCartValidation = () => {
    if (!isCheckoutPage()) return;
    
    try {
      addStyles();
      
      const checkElements = () => {
        const section = findRequiredSection();
        const submitButton = document.querySelector('button[type="submit"]');
        
        if (!section || !submitButton) {
          setTimeout(checkElements, 500);
          return;
        }
  
        checkRequirements();
        initObserver();
      };
  
      checkElements();
    } catch (error) {
      console.error('Cart validation error:', error);
    }
  };
  
  const startValidation = () => {
    if (document.readyState === 'complete') {
      initCartValidation();
    } else {
      window.addEventListener('load', initCartValidation);
      document.addEventListener('DOMContentLoaded', initCartValidation);
    }
  
    setTimeout(initCartValidation, 1000);
    setTimeout(initCartValidation, 3000);
  };
  
  startValidation();