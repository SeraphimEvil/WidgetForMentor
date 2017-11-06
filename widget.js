javascript:
(function() {
  'use strict';

  const MENTOR_NAME = '•••••••';
  const TADA_REACTION = 'tada';

  const commentToCheckBlock = document.createElement('div');
  const checkBlockTitle = document.createElement('h5');
  const checkBlockList = document.createElement('ul');
  let checkBlockItem;

  const commentContainers = document.querySelectorAll('.js-comment-container');
  const commentContainersList = Array.prototype.slice.call(commentContainers);

  var sheet = (function() {
    var style = document.createElement('style');
    document.head.appendChild(style);

    return style.sheet;
  })();

  sheet.addRule('.check-list', 'position: fixed; width: 200px; top: 60px; right: 20px; background-color: #fff; z-index: 999; max-height: calc(100vh - 120px); overflow: auto;', 0);
  sheet.addRule('.check-list', 'min-height: 150px; border: 5px solid #333; border-radius: 5px; box-sizing: border-box; padding: 10px 20px;', 0);
  sheet.addRule('.check-list li', 'cursor: pointer; list-style: none; margin: 10px 0;', 0);
  sheet.addRule('.check-list li.active', 'background-color: #f0f0f0;', 0);

  commentToCheckBlock.classList.add('check-list');
  checkBlockList.classList.add('checkbox-list');

  const checkMentorHooray = (commentContainerElement) => {
    const lastCommentContainer = commentContainerElement.lastElementChild;
    if (lastCommentContainer.classList.contains('js-inline-comments-container')) {
      const lastCommentBlock = lastCommentContainer.querySelector('.js-comments-holder');
      const lastComment = lastCommentBlock.lastElementChild;
      const hoorayEmotionElement = lastComment.querySelector('.js-reactions-container g-emoji[alias="' + TADA_REACTION + '"]');

      if (!hoorayEmotionElement) {
        return true;
      };

      const hoorayBtnElement = hoorayEmotionElement.parentElement;
      const btnElementLabel = hoorayBtnElement.getAttribute('aria-label');

      return btnElementLabel.indexOf(MENTOR_NAME) === -1;
    };
  };

  const makeTheLighting = (element, index) => {
    element.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
    createCommentsBlockListElements(element, 'Comment #' + (index + 1));
  };

  const createCommentsBlock = () => {
    document.body.appendChild(commentToCheckBlock);
    commentToCheckBlock.appendChild(checkBlockTitle);
    commentToCheckBlock.appendChild(checkBlockList);

    checkBlockTitle.innerHTML = 'Check me:';
  };

  const createCommentsBlockListElements =  (element, index) => {
    checkBlockItem = document.createElement('li');

    checkBlockList.appendChild(checkBlockItem);

    checkBlockItem.innerHTML = index;

    const commentItemPosition = element.offsetParent.offsetParent.offsetTop +
      element.offsetParent.offsetTop +
      element.offsetTop +
      (window.innerHeight / 4);

    checkBlockItem.addEventListener('click', function(event) {
      this.classList.add('active');
      window.scrollTo(0, commentItemPosition);
    });
  };

  createCommentsBlock();

  commentContainersList
    .filter(element => element.classList.contains('outdated-comment'))
    .forEach(element => element.classList.remove('outdated-comment'));

  let commentContainersToHighlight = commentContainersList
    .filter(checkMentorHooray);

  commentContainersToHighlight
    .forEach(makeTheLighting);
})();