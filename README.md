# SortingVisualizer

This project was made using javascript and the p5js library 
This meant that all the sorting algorthms would have to be made in a  while loop that linked to the frame rate

**Merge Sort**
Merge Sort is a divide and conquer algorthm. It splits the whole list into serperate nodes then combines then in a sorted order. This would usually be done using recursion but since I had to visualize the process I had to use a while loop that was linked to the frame rate. This meant that I had to use a binary search tree that would store each step of the sorting. Then I would have an ordered array of nodes that would the order the nodes that need to be updated. This combined would simulate the recursion because it has the values stored in the binary search tree and the order to update in the array. 

The Merge sort algorithm has a time complexity of O(Nlog N). This sorting algorthm always has the same speed of O(Nlog N) makign it a reliable sorting algorithm.3

**Quick Sort**
Quick Sort is a divide and conquer algorthm. It selections a pivot, in my implemention it uses the first element in the randomized array. It seperates the values less than the pivot from the ones greater than the pivot. It would then sort those seperate arrays in the same way until there is one value in the list. It would then combine all of the values together. This would usually be done using recursion but since I had to visualize the process I had to use a while loop that was linked to the frame rate. This meant that I had to use a binary search tree that would store each step of the sorting. Then I would have an ordered array of nodes that would the order the nodes that need to be updated. This combined would simulate the recursion because it has the values stored in the binary search tree and the order to update in the array. 

The Quick sort algorithm has a best/average time complexity of O(Nlog(N)). It's worst time complexity of O(N^2) when the array is sorted and you pick the first or last element as a pivot. This makes a quick sort a good choice for unsorted list.

**Bubble Sort**
Bubble sort is a sorting algrothm that repeatedly swaps values that aren't in the right place until the array is sorted.

Bubble sort has a worst/aveage case time complexity and of O(n^2) and a best case time complexity of O(n) on a sorted list. This makes a good sorting algorthm to use on a mostly sorted list.

**Insertion Sort**
Insertion sort is a sorting algorithm that has a sorted and unsorted part. You selected a value from the unsorted part and puts it in the sorted part. You do this for all the values in the unsorted part.

Insertion sort has a worst/average time complexity of O(n^2). It has a best time complexity of O(n) on already sorted list. This makes it a good choice to use on small or mostly sorted lists.

**Selection sort**
Selection sort is a sorting algorithm that gets the right value for the index by getting the least value in the unsorted part of the list. It does this repeatedly until the array is sorted

Selection sort has a time complexity of O(n^2). This makes it a slow sorting algothm in all cases.
