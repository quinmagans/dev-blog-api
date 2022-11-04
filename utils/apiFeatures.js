class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    //Search method
    search() {
        const keyword = this.queryString.keyword ? {
            title: {
                //regular expression that specifies a search pattern in text. 
                $regex: this.queryString.keyword,
                $options: 'i' //case insensitive
            }
        } : {}

        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    //Filter method
    filter() {
        const queryCopy = {...this.queryString};

        console.log(queryCopy);

        //Removing fields from the query 
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        console.log(queryCopy)

        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }    
}

module.exports = APIFeatures;