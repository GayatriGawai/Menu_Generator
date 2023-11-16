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
            // Removed the 'active' class from all menu items
            document.querySelectorAll('.menu-item').forEach((item) => {
                item.classList.remove('active');
            });

            // Adding the 'active' class to the selected menu item
            menuItem.classList.add('active');

            createSidebar(data[key], 2);
            displayContent(data[key], depth);
        });
        menuItem.classList.add('menu-item'); // Adding this line to mark it as a menu item
        menuBar.appendChild(menuItem);
    }
}

// Function to create the sidebar
function createSidebar(data, depth = 2) {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';

    for (const key in data) {
        const sidebarItem = document.createElement('div');
        sidebarItem.textContent = key;
        sidebarItem.classList.add('nav-link', `depth-${depth}`);
        sidebarItem.addEventListener('click', () => {
            // Removed the 'active' class from all sidebar items
            document.querySelectorAll('.sidebar-item').forEach((item) => {
                item.classList.remove('active');
            });

            // Adding the 'active' class to the selected sidebar item
            sidebarItem.classList.add('active');

            displayContent(data[key], depth);
        });
        sidebarItem.classList.add('sidebar-item'); // Add this line to mark it as a sidebar item
        sidebar.appendChild(sidebarItem);
    }
}

// Function to display content in the textarea
function displayContent(content, depth) {
    const textarea = document.getElementById('json-textarea');
    textarea.value = JSON.stringify(content, null, 2);
}

createMenuBar(jsonData);
