'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CustomQuestions() {
  const [customQuestions, setCustomQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newQuestionType, setNewQuestionType] = useState('text');
  const [newQuestionOptions, setNewQuestionOptions] = useState('');

  useEffect(() => {
    const fetchCustomQuestions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/questions/');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setCustomQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchCustomQuestions();
  }, []);

  const handleAddQuestion = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: newQuestion,
          type: newQuestionType,
          options: newQuestionType === 'select' ? newQuestionOptions : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add question');
      }

      const addedQuestion = await response.json();
      setCustomQuestions([...customQuestions, addedQuestion]);
      setNewQuestion('');
      setNewQuestionType('text');
      setNewQuestionOptions('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Custom Questions</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
          <CardDescription>Create a new custom question</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter your question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <Select value={newQuestionType} onValueChange={(value) => setNewQuestionType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="textarea">Textarea</SelectItem>
                <SelectItem value="select">Select</SelectItem>
              </SelectContent>
            </Select>
            {newQuestionType === 'select' && (
              <Input
                placeholder="Enter options (comma-separated)"
                value={newQuestionOptions}
                onChange={(e) => setNewQuestionOptions(e.target.value)}
              />
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddQuestion}>Add Question</Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        {customQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle>{question.question}</CardTitle>
              <CardDescription>Type: {question.type}</CardDescription>
            </CardHeader>
            <CardContent>
              {question.type === 'text' && <Input placeholder="Enter your answer" />}
              {question.type === 'textarea' && <Textarea placeholder="Enter your answer" />}
              {question.type === 'select' && (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options &&
                      question.options.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
