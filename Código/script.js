document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Lógica do Cardápio em Tela Cheia
    const addButtons = document.querySelectorAll('.add-btn-full');
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalEl = document.getElementById('cart-total');
    let cartCount = 0;
    let cartTotal = 0;

    // Função para atualizar o carrinho
    const updateCart = (price) => {
        cartCount++;
        cartTotal += price;
        cartCountEl.textContent = cartCount;
        cartTotalEl.textContent = cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };

    // Delegação de evento para os botões de adicionar (suporta novos itens se adicionados dinamicamente)
    document.getElementById('menu-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn-full') || e.target.parentElement.classList.contains('add-btn-full')) {
            const btn = e.target.classList.contains('add-btn-full') ? e.target : e.target.parentElement;
            const item = btn.closest('.menu-item-full');
            const price = parseFloat(item.getAttribute('data-price'));

            updateCart(price);

            // Feedback visual no botão
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
            btn.style.background = '#00b894';
            btn.style.color = '#fff';
            btn.style.borderColor = '#00b894';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 800);
        }
    });

    // Lógica de Filtragem de Categorias
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item-full');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active de todos e adiciona no clicado
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-category');

            menuItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category').split(' ');
                
                if (selectedCategory === 'all' || itemCategories.includes(selectedCategory)) {
                    item.style.display = 'block';
                    // Pequena animação de fade in
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.3s ease';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Clique no botão de finalizar (simulação)
    const checkoutBtn = document.querySelector('.btn-checkout-full');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartCount > 0) {
                alert(`🚀 Pedido Enviado!\n\nTotal: R$ ${cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\nItens: ${cartCount}\n\nO pedido foi enviado para o sistema da cozinha. Em um cenário real, o KDS (Kitchen Display System) já estaria mostrando seu pedido para os chefs!`);
                
                // Reseta o carrinho
                cartCount = 0;
                cartTotal = 0;
                cartCountEl.textContent = '0';
                cartTotalEl.textContent = '0,00';
            } else {
                alert('Seu carrinho está vazio! Adicione alguns pratos para testar o envio para a cozinha.');
            }
        });
    }

    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', () => {
            alert('Menu mobile ativado. Navegue pelas seções da página!');
        });
    }
});
