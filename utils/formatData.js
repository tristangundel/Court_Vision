
function formatData(json) {
	var data = {};
    var result_set = json.resultSets;
    for(i in result_set){
        var merged = {};
        if(result_set[i].rowSet.length !== 1){
            var multipleRowSets = {};
            for(j in result_set[i].rowSet){
                var temp = {};
                for(k in result_set[i].headers){
                    temp[result_set[i].headers[k]] = result_set[i].rowSet[j][k];
                }
                multipleRowSets[j] = temp;
            }
            data[result_set[i].name] = multipleRowSets;
        } else {
            for(j in result_set[i].headers){
                merged[result_set[i].headers[j]] = result_set[i].rowSet[0][j];
            }
            data[result_set[i].name] = merged;
        }
    }
    return data;
};

module.exports = formatData;