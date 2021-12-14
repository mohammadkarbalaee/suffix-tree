import java.util.LinkedList;

public class SuffixTree {
  private static final String WORD_TERMINATION = "$";
  private static final int POSITION_UNDEFINED = -1;
  private Node root;
  private String fullText;

  public SuffixTree(String text) {
    root = new Node("", POSITION_UNDEFINED);
    fullText = text;
  }

  private void addChildNode(Node parentNode, String text, int index) {
    parentNode.getChildren().add(new Node(text, index));
  }

  private String getLongestCommonPrefix(String firstString, String secondString) {
    int compareLength = Math.min(firstString.length(), secondString.length());
    for (int i = 0; i < compareLength; i++) {
      if (firstString.charAt(i) != secondString.charAt(i)) {
        return firstString.substring(0, i);
      }
    }
    return firstString.substring(0, compareLength);
  }

  private void splitNodeToParentAndChild(Node parentNode, String parentNewText, String childNewText) {
    Node childNode = new Node(childNewText, parentNode.getPosition());
    if (parentNode.getChildren().size() > 0) {
      while (parentNode.getChildren().size() > 0) {
        childNode.getChildren().add(parentNode.getChildren().remove(0));
      }
    }
    parentNode.getChildren().add(childNode);
    parentNode.setText(parentNewText);
    parentNode.setPosition(POSITION_UNDEFINED);
  }

  public LinkedList<Node> getAllNodesInTraversePath(String pattern, Node startNode, boolean isAllowPartialMatch) {
    if (pattern.charAt(0) == startNode.getText().charAt(0)) {

    }
  }

  public Node getRoot() {
    return root;
  }

  public void setRoot(Node root) {
    this.root = root;
  }

  public String getFullText() {
    return fullText;
  }

  public void setFullText(String fullText) {
    this.fullText = fullText;
  }
}

class Node{
  private String text;
  private LinkedList<Node> children;
  private int position;

  public Node(String word, int position) {
    this.text = word;
    this.position = position;
    this.children = new LinkedList<>();
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public LinkedList<Node> getChildren() {
    return children;
  }

  public void setChildren(LinkedList<Node> children) {
    this.children = children;
  }

  public int getPosition() {
    return position;
  }

  public void setPosition(int position) {
    this.position = position;
  }
}