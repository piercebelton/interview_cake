//initial brute force attempt
function getMaxProfit(stockPricesYesterday) {
  var maxProfit = stockPricesYesterday[0] - stockPricesYesterday[1];
  for (var i = 0; i < stockPricesYesterday.length; i++) {
    var j = i + 1;
    while (j < stockPricesYesterday.length) {
      if (stockPricesYesterday[i] - stockPricesYesterday[j] < maxProfit) {
        maxProfit = stockPricesYesterday[i] - stockPricesYesterday[j];
      }
      j++;
    }
  }
  maxProfit *= -1;
  return maxProfit;
}

//initital attempt
function getProductsOfAllIntsExceptAtIndex(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    var productOfLower = i - 1;
    var productOfUpper = i + 1;
    var arrProduct = 1;
    while (productOfLower >= 0) {
      arrProduct *= arr[productOfLower];
      productOfLower--;
    }
    while (productOfUpper < arr.length) {
      arrProduct *= arr[productOfUpper];
      productOfUpper++;
    }
    newArr.push(arrProduct);
  }
  return newArr;
}


function getProductsOfAllIntsExceptAtIndex(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    var arrProduct = 1;
    for (j = 0; j < arr.length; j++) {
      if (j != i){
        arrProduct *= arr[j]
      }
    }
    newArr.push(arrProduct);
  }
  return newArr;
}

getProductsOfAllIntsExceptAtIndex([1, 0, 3, 4]);

getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4]);

//initial expensive function, triple nested loop
function highestProductOfThree(arrayOfInts) {
  var highestProduct = 0;
  for (var i = 0; i < arrayOfInts.length - 2; i++) {
    for (var j = i + 1; j < arrayOfInts.length - 1; j++) {
      for (var k = j + 1; k < arrayOfInts.length; k++) {
        if ((arrayOfInts[i] * arrayOfInts[j] * arrayOfInts[k]) > highestProduct) {
          highestProduct = arrayOfInts[i] * arrayOfInts[j] * arrayOfInts[k];
        }
      }
    }
  }
  return highestProduct;
}

//far more efficient, still fails if negative numbers are required to yield greatest result
function highestProductOfThree(arrayOfInts) {
  var sortedArr = arrayOfInts.sort(function(a, b){return a-b});
  var highestProduct = sortedArr[sortedArr.length - 1] * sortedArr[sortedArr.length - 2] * sortedArr[sortedArr.length - 3];
  return highestProduct;
}

//Made negatives work by splitting highest and lowest. Used sorting function.
function highestProductOfThree(arrayOfInts) {
  if (arrayOfInts.length < 3) {
    return "Array must contain at least 3 integers";
  }
  var highestProduct = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];
  var sortedArr = arrayOfInts.sort(function(a, b){return a-b});
  var highestProductOfTwo = sortedArr.slice(-1)[0] * sortedArr.slice(-2)[0];
  var lowestProductOfTwo = sortedArr[0] * sortedArr[1];
  if (arrayOfInts.length === 4) {
    highestProduct = Math.max(
      highestProduct,
      arrayOfInts[0] * arrayOfInts[2] * arrayOfInts[3],
      arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[3],
      arrayOfInts[1] * arrayOfInts[2] * arrayOfInts[3]
    )
  }
  for (var i = 2; i < sortedArr.length - 2; i++) {
    if ((sortedArr[i] * highestProductOfTwo) > highestProduct) {
      highestProduct = sortedArr[i] * highestProductOfTwo;
    } else if ((sortedArr[i] * lowestProductOfTwo) > highestProduct) {
      highestProduct = sortedArr[i] * lowestProductOfTwo;
    }
  }
  return highestProduct;
}

//attempt to do the whole thing with no sorting, just math.max and comparing!
function findHighestProductOfThree(arrayOfInts) {
  var highest = Math.max(arrayOfInts[0], arrayOfInts[1]);
  var lowest = Math.min(arrayOfInts[0], arrayOfInts[1]);
  var lowestProductOfTwo = arrayOfInts[0] * arrayOfInts[1];
  var highestProductOfTwo = arrayOfInts[0] * arrayOfInts[1];
  var highestProductOfThree = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];
  for (var i = 2; i < arrayOfInts.length; i++) {
    var current = arrayOfInts[i];
    highestProductOfThree = Math.max(
      highestProductOfThree,
      highestProductOfTwo * current,
      lowestProductOfTwo * current
    );
    highestProductOfTwo = Math.max(
      highestProductOfTwo,
      highest * current
    );
    lowestProductOfTwo = Math.min(
      lowestProductOfTwo,
      lowest * current
    );
    highest = Math.max(
      highest,
      current
    );
    lowest = Math.min(
      lowest,
      current
    );
  }
  return highestProductOfThree;
}

highestProductOfThree([0, 1, 2])

highestProductOfThree([1, 1, 5])

highestProductOfThree([1, 1, 5, 2])

highestProductOfThree([6, 1, 2, 9, -12])


var testMeetings = [
  {startTime: 0,  endTime: 1},
  {startTime: 3,  endTime: 5},
  {startTime: 4,  endTime: 8},
  {startTime: 10, endTime: 12},
  {startTime: 9,  endTime: 10},
  {startTime: 0,  endTime: 1}
]

// initial attempt
function mergeRanges(meetings) {
  var updatedRanges = [meetings[0]];
  for (var i = 1; i < meetings.length; i++) {
    for (var j = 0; j < updatedRanges.length; j++) {
      if (meetings[i].startTime < updatedRanges[j].startTime) {
        if (meetings[i].endTime < updatedRanges[j].startTime) {
          updatedRanges.splice(j, 0, meetings[i])
          break;
        } else if (meetings[i].endTime >= updatedRanges[j].startTime) {
          updatedRanges[j].startTime = meetings[i].startTime;
          if (meetings[i].endTime > updatedRanges[j].endTime) {
            updatedRanges[j].endTime = meetings[i].endTime;
          }
        }
      } else if (meetings[i].startTime <= updatedRanges[j].endTime) {
        if (meetings[i].endTime > updatedRanges[j].endTime) {
          updatedRanges[j].endTime = meetings[i].endTime;
          break;
        } else {
          break;
        }
      } else if (meetings[i].startTime > updatedRanges[updatedRanges.length - 1].endTime) {
        updatedRanges.push(meetings[i]);
      }
    }
  }
  return updatedRanges;
}

// cleaner solution, used sorting to eliminate a nested loop
function mergeRanges(meetings) {
  var sortedByStartTime = meetings.slice(0);
  sortedByStartTime.sort(function(a,b) {
    return a.startTime - b.startTime;
  });
  var updatedRanges = [sortedByStartTime[0]];
  var last = updatedRanges.length - 1;
  for (var i = 1; i < sortedByStartTime.length; i++) {
    if (sortedByStartTime[i].startTime > updatedRanges[last].endTime) {
      updatedRanges.push(sortedByStartTime[i]);
      last++;
    } else if (sortedByStartTime[i].startTime <= updatedRanges[last].endTime) {
      if (sortedByStartTime[i].endTime > updatedRanges[last].endTime) {
        updatedRanges[last].endTime = sortedByStartTime[i].endTime;
      }
    }
  }
  return updatedRanges;
}

mergeRanges(testMeetings);



function numberOfWays(amount, denominations) {
  var possibleCombinations = 0;
  var arrOfCombinations = [];

}



function findRectangularIntersection(r1, r2) {
  var result = {};
  var horizontalOverlap = 0;
  var verticalOverlap = 0;
  var leftX = 0;
  var bottomY = 0;
  r1.rightX = r1.leftX + r1.width;
  r1.topY = r1.bottomY + r1.height;
  r2.rightX = r2.leftX + r2.width;
  r2.topY = r2.bottomY + r2.height;

  if (r1.leftX <= r2.leftX && r2.leftX <= r1.rightX) {
    if (r2.rightX < r1.rightX) {
      horizontalOverlap = r2.width
    } else {
      horizontalOverlap = r1.rightX - r2.leftX;
    }
    leftX = r2.leftX;
  } else if (r1.leftX > r2.leftX && r1.leftX <= r2.rightX) {
    if (r1.rightX < r2.rightX) {
      horizontalOverlap = r1.width
    } else {
      horizontalOverlap = r2.rightX - r1.leftX;
    }
    leftX = r1.leftX;
  }
  if (r1.bottomY <= r2.bottomY && r2.bottomY <= r1.topY) {
    if (r2.topY < r1.topY) {
      verticalOverlap = r2.height;
    } else {
      verticalOverlap = r1.topY - r2.bottomY;
    }
    bottomY = r2.bottomY;
  } else if (r1.bottomY > r2.bottomY && r1.bottomY <= r2.topY) {
    if (r1.topY < r2.topY) {
      verticalOverlap = r1.height;
    } else {
      verticalOverlap = r2.topY - r1.bottomY;
    }
    bottomY = r1.bottomY;
  }
  if (verticalOverlap > 0 && horizontalOverlap > 0) {
    result.leftX = leftX;
    result.bottomY = bottomY;
    result.width = horizontalOverlap;
    result.height = verticalOverlap;
  }
  return result;
}

//test cases:
//rectangle1 vs rectangle3 tests a rectangle completely inside another
//rectangle1 vs rectangle4 tests rectangles that touch edges but do not overlap
var rectangle1 = {
  leftX: 1,
  bottomY: 5,
  width: 10,
  height: 4
};

var rectangle2 = {
  leftX: 8,
  bottomY: 7,
  width: 5,
  height: 6
};

var rectangle3 = {
  leftX: 2,
  bottomY: 6,
  width: 2,
  height: 2
};

var rectangle4 = {
  leftX = 11,
  bottomY = 6,
  width = 5,
  height = 6
};


var temperatures = [];

function insert(temp) {
  temperatures.push(temp);
}

function getMax(temps) {
  temps.sort(function(a,b) {
    return a - b;
  });
  return temps[temps.length - 1];
}

function getMin(temps) {
  
}

















blerg
