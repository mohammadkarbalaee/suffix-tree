package linkedlist;

class Node<T>{
  public T data;
  public Node<T> previousNode;
  public Node<T> nextNode;

  Node(Node<T> previousNode,T data,Node<T> nextNode){
    this.previousNode = previousNode;
    this.data = data;
    this.nextNode = nextNode;
  }
}

public class LinkedList<T>{
  public Node<T> headNode = null;

  public Node<T> search(T wantedData){
    Node<T> wantedNode = this.headNode;
    while (wantedNode != null && wantedNode.data != wantedData){
      wantedNode = wantedNode.nextNode;
    }
    return wantedNode;
  }

  public void insert(Node newNode){
    newNode.nextNode = this.headNode;
    if (this.headNode != null){
      this.headNode.previousNode = newNode;
    }
    newNode.previousNode = null;
    this.headNode = newNode;
  }

  public void delete(Node<T> nodeToDelete){
    if (nodeToDelete.previousNode != null){
      nodeToDelete.previousNode.nextNode = nodeToDelete.nextNode;
    } else {
      this.headNode = nodeToDelete.nextNode;
    }
    if (nodeToDelete.nextNode != null){
      nodeToDelete.nextNode.previousNode = nodeToDelete.previousNode;
    }
  }

  public void printAllNodes(){
    Node<T> walkingHead = this.headNode;
    while (walkingHead != null){
      System.out.print(walkingHead.data + " ");
      walkingHead = walkingHead.nextNode;
    }
  }
}