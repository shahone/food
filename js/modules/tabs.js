//! Tabs

function tabs (content, links, linksArea) {

  const tabsContent = document.querySelectorAll(content);
  const tabsLink = document.querySelectorAll(links);
  const linksWrap = document.querySelector(linksArea);

  const showTab = (n = 0) => {
    tabsContent.forEach((tab) => {
      tab.classList.add('hide');
    });
    tabsContent[n].classList.remove('hide');
    tabsContent[n].classList.add('fade');
    tabsLink.forEach((link, k) => {
      link.classList.remove('tabheader__item_active');
    });
    tabsLink[n].classList.add('tabheader__item_active');
  };
  showTab(1);

  const changeTab = (e, target) => {
    if (e.target && e.target.matches(target)) {
      tabsLink.forEach((link, k) => {
        if (e.target === link) {

          showTab(k);

        }
      });
    }
  };

  linksWrap.addEventListener('click', (e) => changeTab(e, '.tabheader__item'));
}

export default tabs;