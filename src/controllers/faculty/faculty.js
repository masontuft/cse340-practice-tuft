// Imports
import { getFacultyBySlug, getSortedFaculty } from '../../models/faculty/faculty.js';

const facultyListPage = async (req, res) => {
    const validSortOptions = ['name', 'department', 'title'];
    const sortBy = validSortOptions.includes(req.query.sort) ? req.query.sort : 'department';
    const facultyList = await getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: facultyList,
        currentSort: sortBy || 'name'
    });
};

const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.facultySlug;
    const faculty = await getFacultyBySlug(facultySlug);

    //  Null check, if faculty doesn't exist, create 404 error
    if(!faculty || Object.keys(faculty).length === 0) {
        const err = new Error(`Faculty ${facultySlug} not found`);
        err.status = 404;
        return next(err); 
    }

    // Render faculty detail page
    res.render('faculty/detail', {
        title: `${faculty.firstName} ${faculty.lastName} - ${faculty.title}`,
        name: faculty.firstName + ' ' + faculty.lastName,
        jobTitle: faculty.title,
        office: faculty.office,
        phone: faculty.phone,
        email: faculty.email,
        department: faculty.department,
        faculty: faculty
    })
};


export { facultyListPage, facultyDetailPage };