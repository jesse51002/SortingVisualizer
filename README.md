# SortingVisualizer

This project was made using javascript and the p5js library
This means that all the sorting algorithms would have to be made in a while loop that linked to the frame rate

**Merge Sort**

Merge Sort is a divide and conquer algorithm. It splits the whole list into separate nodes then combines them in a sorted order. This would usually be done using recursion but since I had to visualize the process I had to use a while loop that was linked to the frame rate. This meant that I had to use a binary search tree that would store each step of the sorting. Then I would have an ordered array of nodes that would store the order that the nodes that need to be updated. This combined would simulate the recursion because it has the values stored in the binary search tree and the order to update in the array.

The Merge sort algorithm has a time complexity of O(N log N). This sorting algorithm always has the same speed of O(N log N) making it a reliable sorting algorithm.

**Quick Sort**

Quick sort is a divide and conquer algorithm. It selections a pivot, in my implementation it uses the first element in the randomized array. It separates the values less than the pivot from the ones greater than the pivot. It would then sort those separate arrays in the same way until there is one value in the list. It would then combine all of the values. This would usually be done using recursion but since I had to visualize the process I had to use a while loop that was linked to the frame rate. This meant that I had to use a binary search tree that would store each step of the sorting. Then I would have an ordered array of nodes that would store the order that the nodes that need to be updated. This combined would simulate the recursion because it has the values stored in the binary search tree and the order to update in the array.

The Quick sort algorithm has a best/average time complexity of O(Nlog(N)). The worst time complexity of O(N^2) is when the array is sorted and you pick the first or last element as a pivot. This makes a quick sort a good choice for an unsorted list.

**Bubble Sort**

Bubble sort is a sorting algorithm that repeatedly swaps values that aren't in the right place until the array is sorted.

Bubble sort has a worst/average-case time complexity and of O(n^2) and best-case time complexity of O(n) on a sorted list. This makes a good sorting algorithm to use on a mostly sorted list.

**Insertion Sort**

Insertion sort is a sorting algorithm that has a sorted and unsorted part. You selected a value from the unsorted part and puts it in the sorted part. You do this for all the values in the unsorted part.

Insertion sort has a worst/average time complexity of O(n^2). It has a best time complexity of O(n) on a sorted list. This makes it a good choice to use on small or mostly sorted lists.

**Selection sort**
Selection sort is a sorting algorithm that gets the right value for the index by getting the least value in the unsorted part of the list. It does this repeatedly until the array is sorted

Selection sort has a time complexity of O(n^2). This makes it a slow sorting algorithm in all cases.
