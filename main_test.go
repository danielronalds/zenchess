package main

import "testing"

func TestAdd(t *testing.T) {
	actual := add(1, 2)

	expected := 3

	if actual != expected {
		t.Fatalf("Expected %v, got %v", expected, actual)
	}
}
