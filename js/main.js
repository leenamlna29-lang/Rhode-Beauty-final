/* =============================
   RHODE BEAUTY — Hamburger Menu
   ============================= */

const btn  = document.getElementById('hamburger-btn');
const menu = document.getElementById('mobile-menu');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');

if (btn) {
    btn.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');

        if (isOpen) {
            bar1.style.transform = 'translateY(8px) rotate(45deg)';
            bar2.style.opacity   = '0';
            bar3.style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            bar1.style.transform = '';
            bar2.style.opacity   = '1';
            bar3.style.transform = '';
        }
    });
}
