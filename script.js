const courses = [
    { id: 1, title: "React for Beginners", category: "development", level: "Beginner", img: "https://via.placeholder.com/300x160" },
    { id: 2, title: "Advanced CSS Grid", category: "design", level: "Intermediate", img: "https://via.placeholder.com/300x160" },
    { id: 3, title: "Startup Finance", category: "business", level: "Advanced", img: "https://via.placeholder.com/300x160" },
    { id: 4, title: "Python Data Science", category: "development", level: "Intermediate", img: "https://via.placeholder.com/300x160" }
];

let completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];

document.addEventListener('DOMContentLoaded', () => {
    displayCourses(courses);
    updateProgressBar();

    // Search Feature
    document.getElementById('courseSearch').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = courses.filter(c => c.title.toLowerCase().includes(term));
        displayCourses(filtered);
    });

    // Filter Feature
    document.getElementById('filter-group').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            document.querySelectorAll('#filter-group .btn').forEach(btn => btn.classList.remove('active', 'btn-dark'));
            e.target.classList.add('active', 'btn-dark');
            
            const filter = e.target.getAttribute('data-filter');
            const filtered = filter === 'all' ? courses : courses.filter(c => c.category === filter);
            displayCourses(filtered);
        }
    });
});

function displayCourses(courseList) {
    const grid = document.getElementById('course-grid');
    grid.innerHTML = courseList.map(course => `
        <div class="col-md-4">
            <div class="card course-card h-100 ${completedCourses.includes(course.id) ? 'card-completed' : ''}">
                <img src="${course.img}" class="card-img-top" alt="...">
                <span class="badge bg-success completed-badge"><i class="fas fa-check"></i> Completed</span>
                <div class="card-body">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="text-muted small">${course.level} • ${course.category}</p>
                    <button onclick="toggleComplete(${course.id})" class="btn ${completedCourses.includes(course.id) ? 'btn-outline-secondary' : 'btn-primary'} w-100">
                        ${completedCourses.includes(course.id) ? 'Mark Incomplete' : 'Complete Lesson'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleComplete(id) {
    if (completedCourses.includes(id)) {
        completedCourses = completedCourses.filter(item => item !== id);
    } else {
        completedCourses.push(id);
    }
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
    displayCourses(courses);
    updateProgressBar();
}

function updateProgressBar() {
    const percent = (completedCourses.length / courses.length) * 100;
    document.getElementById('main-progress').style.width = percent + '%';
}