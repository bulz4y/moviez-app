export let scrollPage = 2;
export let maxScrollPage = 500;
export let scrollPosition = 0;

export function getScrollPosition() {
  return scrollPosition;
}

export function setScrollPostiion(val) {
  scrollPosition = val;
}


export function incrementScrollPage() {
    return ++scrollPage;
};

export function resetScrollPage() {
  scrollPage = 2;
};


