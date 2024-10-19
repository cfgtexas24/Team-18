from fastapi import APIRouter, FastAPI, Query
from pydantic import BaseModel
import datetime
import json
import os

# Initialize the APIRouter
router = APIRouter()


def load_mock_patient_data():
    with open("routes/patientMock.json", "r") as file:  # corrected filename
        data = json.load(file)
    return data


@router.get("/admin/patients")
def admin_patients():
    mock_patients = load_mock_patient_data()
    return mock_patients
