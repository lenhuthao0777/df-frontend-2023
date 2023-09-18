// Your JS code goes here
const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

let dataLocal = JSON.parse(localStorage.getItem('data')) || [];

const tableContent = $('#table-content');

const form = $('#form');

const inputSearch = $('.input-search');

const btnAdd = $('#btn-add');

const modalAdd = $('.modal-add');

const btnClose = $('#btn-close');

const modalConfirm = $('.modal-confirm');

const btnCloseModalConfirm = $('#close-modal__confirm');

const btnCancel = $('#btn-cancel');

const btnConfirm = $('#btn-confirm');

const inputName = $('#name');

const inputAuthor = $('#author');

const inputTopic = $('#topic');

const randomId = () => Math.floor(Math.random() * 100);

const tableData = [
  {
    id: randomId(),
    name: 'Refactoring',
    author: 'Martin fowler',
    topic: 'Programming',
  },
  {
    id: randomId(),
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: randomId(),
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'Devops',
  },
];

// handle search
inputSearch.addEventListener('keyup', (e) => {
  const target = e.target.value;
  const newData = dataLocal.filter((item) => {
    return (
      item.name.toLowerCase().includes(target) ||
      item.name.includes(target) ||
      item.name.toUpperCase().includes(target)
    );
  });

  displayTableData(newData);
});
// end handle search

// handle set data local
const handleSetDataLocal = (data) => {
  localStorage.setItem('data', JSON.stringify(data));
};

if (!dataLocal.length) {
  handleSetDataLocal(tableData);

  window.location.reload();
}

// end handle set data local

const displayTableData = (data = []) => {
  const dataTable = data
    .map(
      (item) => `
  <tr id="${item.id}">
    <td>${item.name}</td>
    <td>${item.author}</td>
    <td>${item.topic}</td>
    <td class="action-item" id="${item.name}__${item.id}">Delete</td>
  </tr>
  `
    )
    .join('');

  tableContent.innerHTML = dataTable;
};

displayTableData(dataLocal);

// handle delete item
const deleteActions = document.querySelectorAll('.action-item');

tableContent.addEventListener(
  'click',
  (e) => {
    const className = e.target.className;
    if (className === 'action-item') {
      modalConfirm.style.display = 'block';

      const ele = e.target.parentElement;

      let id = e.target.id.split('__');

      btnConfirm.addEventListener('click', (e) => {
        if (id) {
          handleRemoveRow(id[1]);
          ele.remove();
        }

        modalConfirm.style.display = 'none';
      });

      btnCancel.addEventListener('click', () => {
        id = null;
        modalConfirm.style.display = 'none';
      });
    }
  },
  false
);

const handleRemoveRow = (id) => {
  if (id) {
    const findItem = dataLocal.findIndex((item) => item.id === Number(id));

    dataLocal.splice(findItem, 1);

    handleSetDataLocal(dataLocal);
  }
};
// end handle delete item

btnAdd.addEventListener('click', () => {
  modalAdd.style.display = 'block';
});

btnClose.addEventListener('click', () => {
  inputName.value = '';

  inputAuthor.value = '';

  inputTopic.value = '';

  modalAdd.style.display = 'none';
});

btnCloseModalConfirm.addEventListener('click', () => {
  modalConfirm.style.display = 'none';
});

// handle add item
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameValue = inputName.value;

  const authorValue = inputAuthor.value;

  const topicValue = inputTopic.value;

  if (nameValue && authorValue && topicValue) {
    dataLocal.push({
      id: randomId() * 10,
      name: nameValue,
      author: authorValue,
      topic: topicValue,
    });

    handleSetDataLocal(dataLocal);
  }

  inputName.value = '';

  inputAuthor.value = '';

  inputTopic.value = '';

  modalAdd.style.display = 'none';

  window.location.reload();
});
// end handle add item
