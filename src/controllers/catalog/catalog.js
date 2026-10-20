// Update these imports:
import { getAllCourses, getCourseBySlug } from '../../models/catalog/courses.js';
import { getSectionsByCourseSlug } from '../../models/catalog/catalog.js';

// Route handler for the course catalog list page
const catalogPage = async (req, res) => {
    // Model functions are async, so we must await them
    const courses = await getAllCourses();
    
    console.log('Courses retrieved:', courses); // Debugging log
    res.render('catalog', {
        title: 'Course Catalog',
        courses: courses
    });
};

// Route handler for individual course detail pages
const courseDetailPage = async (req, res, next) => {
    // Get sections (course offerings) separately from the catalog
    // Pass the sortBy parameter directly to the model - PostgreSQL handles the sorting
    const sortBy = req.query.sort || 'time';
    const courseSlug = req.params.slugId;
    const course = await getCourseBySlug(courseSlug);
    const sections = await getSectionsByCourseSlug(courseSlug, sortBy);
    
    // Our model returns empty object {} when not found, not null
    // Check if the object is empty using Object.keys()
    console.log('Course data retrieved:', course); // Debugging log
    if (Object.keys(course).length === 0) {
        const err = new Error(`Course ${courseSlug} not found`);
        err.status = 404;
        return next(err);
    }
    
    // id: section.id,
    //     time: section.time,
    //     room: section.room,
    //     courseCode: section.course_code,
    //     courseName: section.course_name,
    //     description: section.description,
    //     creditHours: section.credit_hours,
    //     professor: `${section.first_name} ${section.last_name}`,
    //     professorSlug: section.faculty_slug,
    //     professorTitle: section.faculty_title,
    //     department: section.department_name,
    //     departmentCode: section.department_code
    
    res.render('course-detail', {
        title: `${course.courseCode} - ${course.name}`,
        course: course,
        sections: sections,
        currentSort: sortBy
    });
};

export { catalogPage, courseDetailPage };