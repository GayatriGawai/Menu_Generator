let jsonData = [];

fetch('dataFile.json')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        jsonData = data;

        // Initialized the menu bar and sidebar
        createMenuBar(jsonData);
        createSidebar(jsonData[Object.keys(jsonData)[0]], 2);
    });

// Function to create the Navigation bar
function createMenuBar(data, depth = 1) {
    const menuBar = document.getElementById('menu-bar');
    for (const key in data) {
        const menuItem = document.createElement('div');
        menuItem.textContent = key;
        menuItem.classList.add('nav-link', `depth-${depth}`);
        menuItem.addEventListener('click', () => {
            createSidebar(data[key], 2); //To print the selected items
            displayContent(data[key], depth);
        });
        menuBar.appendChild(menuItem);
    }
}

// Function to create the sidebar
function createSidebar(data, depth = 2) {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = ''; //To reset the sidebar so it will print the next depth2 of selected item

    for (const key in data) {
        const sidebarItem = document.createElement('div');
        sidebarItem.textContent = key;
        sidebarItem.classList.add('nav-link', `depth-${depth}`);
        sidebarItem.addEventListener('click', () =>
            displayContent(data[key], depth)
        );
        sidebar.appendChild(sidebarItem);
    }
}

// Function to display content in the textarea
function displayContent(content, depth) {
    const textarea = document.getElementById('json-textarea');
    textarea.value = JSON.stringify(content, null, 2);
}

createMenuBar(jsonData);
