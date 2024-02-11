const TAB_LAYER_OFFSET = "1.25rem";

const headList = document.getElementById('head-list');
const listItemTemplate = document.getElementById('list-item')
const subListTemplate = document.getElementById('sub-list'); 


const url = "./response.json"

async function getData(src) {
    const res = await fetch(src);
    const data = await res.json();
    return data.services;
}

const services = await getData(url);
const sortedServices = services.toSorted((a,b) => a.head < b.head ? -1 : 1)


function createItem(template, id, tabText, price, nodes, head) {

    const tabId = `tab-${id}`
    const btnId = `${tabId}-btn`
    const tabNameId = `${tabId}-name`;
    const listId = `list-${id}`;
    const childElId = `child-${id}`;
      
    const tabNameText = price > 0 ? `${tabText} (${price} руб.)` : tabText;

    const tab = listItemTemplate.content.querySelector('.tab');
    const tabName = listItemTemplate.content.querySelector('.tab-name');
    const tabBtn = listItemTemplate.content.querySelector('.arrow-btn');
    const gridFlow = listItemTemplate.content.querySelector('.grid-flow');
    const subList = listItemTemplate.content.querySelector('.tab__nav');

    tab.setAttribute('id', tabId);
    tabName.setAttribute('id', tabNameId);
    tabBtn.setAttribute('id', btnId);
    tabBtn.setAttribute('data-id', id);
    gridFlow.setAttribute('id', childElId);
    subList.setAttribute('id', listId);
    tabName.textContent = tabNameText;
    
    if (nodes == 0) {
        tabBtn.style.display = "none";
        gridFlow.style.display = "none";
    } else {
        tabBtn.style.display = "inline-block";
        gridFlow.style.display = "grid";
        if(head !== null) {
            tab.style.marginLeft = TAB_LAYER_OFFSET;
        }
    }
    
    const newTab = listItemTemplate.content.cloneNode(true);
    return newTab;
}

function drawTabs (DOMel, arr) {
    arr.map(service => {
        const id = service.id;
        const tabName = service.name;
        const price = service.price;
        const node = service.node;
        const head = service.head;

        const newTab = createItem(listItemTemplate, id, tabName, price, node, head)

        if(service.head === null) {
            DOMel.appendChild(newTab)
        } else {
            const subList = document.getElementById(`list-${service.head}`)
            subList.appendChild(newTab)
        }   
    })
}

drawTabs(headList, sortedServices);

const btns = document.querySelectorAll('.arrow-btn')

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const btnId = btn.getAttribute('data-id');
        const dropDown = document.getElementById(`child-${btnId}`);
        const dropDownState = dropDown.getAttribute('data-state');
        if (dropDownState === "closed"){
            dropDown.setAttribute('data-state', "opened")
            btn.setAttribute('data-state', "opened")
        } else if (dropDownState === "opened") {
            dropDown.setAttribute('data-state', "closed")
            btn.setAttribute('data-state', "closed")
        }
    })
})