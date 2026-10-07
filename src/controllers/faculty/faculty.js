// Imports
import { getFacultyById } from "../../models/faculty/faculty.js";
import { getSortedFaculty } from "../../models/faculty/faculty.js";

const facultyListPage = (req, res) => {
    const sort = req.query.sort;
    const facultyList = getSortedFaculty(sort);

    res.render('faculty/list', {
        title: 'Faculty List',
        faculty: facultyList
    });
};

const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const faculty = getFacultyById(facultyId);

    //  Null check, if faculty doesn't exist, create 404 error
    if(!faculty) {
        const err = new Error(`Faculty ${faculty} not found`);
        err.status = 404;
        return next(err); 
    }

    // Render faculty detail page
    res.render('faculty/detail', {
        title: `${faculty.name} - ${faculty.title}`,
        name: faculty.name,
        title: faculty.title,
        office: faculty.office,
        phone: faculty.phone,
        email: faculty.email,
        department: faculty.department
    })
};


export { facultyListPage, facultyDetailPage };