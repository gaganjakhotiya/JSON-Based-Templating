module.exports = {
    "basic!": {
        "name!": "string",
        "mobile!": "number",
        "email!": "string",
        "picture": "string",
        "website": "string",
        "summary": "string",
        "location!": {
            "address!": "string",
            "city!": "string",
            "country!": "string",
            "pincode!": "string"
        },
        "profiles": {
            "github": "string",
            "linkedin": "string"
        }
    },
    "work": [{
        "company!": "string",
        "position!": "string",
        "startDate!": "date",
        "endDate!": "date",
        "website": "string",
        "summary": "string"
    }],
    "education!": [{
        "school!": "string",
        "area": "string",
        "degree": "string",
        "startDate": "date",
        "endDate": "date",
        "score": "number",
        "courses": "string[]"
    }],
    "volunteer": [{
        "organization!": "string",
        "position!": "string",
        "startDate!": "date",
        "endDate!": "date",
        "website": "string",
        "summary": "string"
    }],
    "awards": [{
        "title!": "string",
        "date": "date",
        "awarder": "string",
        "summary": "string"
    }],
    "skills!": [{
        "name!": "string",
        "level": "string",
        "keywords": "string[]"
    }],
    "languages!": [{
        "name!": "string",
        "level": "string"
    }],
    "interests": [{
        "name!": "string",
        "keywords": "string[]"
    }],
    "references": [{
        "name!": "string",
        "note!": "string"
    }]
}