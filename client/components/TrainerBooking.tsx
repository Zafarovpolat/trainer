import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./ui/collapsible";
import { Input } from "./ui/input";
import { Coach, type LocationItem, LocationsResponse, type ServiceItem, ServicesResponse, type ScheduleDay, FreeSlotsResponse, ServiceRequest, ServiceRequestResponse } from "../../shared/api";

interface ServiceOption {
  id: string;
  name: string;
  duration: string;
  price: string;
  selected: boolean;
}

interface LocationOption {
  id: string;
  name: string;
  address: string;
  selected: boolean;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  selected: boolean;
}

export default function TrainerBooking() {
  const [searchParams] = useSearchParams();
  const linkCode = searchParams.get('linkCode') || 'abc123'; // Default for testing

  const [coach, setCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string>('');

  const [selectedLanguage, setSelectedLanguage] = useState('Rus');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDateTimeOpen, setIsDateTimeOpen] = useState(false);
  const [showPersonalDataForm, setShowPersonalDataForm] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const languageOptions = [
    {
      code: 'Rus',
      name: 'Rus',
      flag: (
        <svg width="auto" height="auto" viewBox="0 0 44 44" fill="none">
          <path
            d="M21.8 40.9999C11.1961 40.9999 2.6 32.4037 2.6 21.7999C2.6 11.196 11.1961 2.59985 21.8 2.59985C32.4039 2.59985 41 11.196 41 21.7999C41 32.4037 32.4039 40.9999 21.8 40.9999Z"
            fill="#0052B5"
          />
          <path
            d="M39.7908 15.0799C37.0668 7.79025 30.0393 2.59985 21.7996 2.59985C13.5599 2.59985 6.53244 7.79025 3.80847 15.0799L39.7908 15.0799Z"
            fill="white"
          />
          <path
            d="M3.80957 28.5198C6.53354 35.8094 13.561 40.9998 21.8007 40.9998C30.0405 40.9998 37.0679 35.8094 39.7919 28.5198L3.80957 28.5198Z"
            fill="#D90026"
          />
        </svg>
      ),
    },
    {
      code: 'Eng',
      name: 'Eng',
      flag: (
        <svg width="auto" height="auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_5_837)">
            <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#F0F0F0" />
            <path d="M1.86097 3.51953C1.15402 4.43932 0.620941 5.49946 0.310547 6.65114H4.99259L1.86097 3.51953Z" fill="#0052B4" />
            <path d="M17.6898 6.65111C17.3794 5.49946 16.8463 4.43932 16.1394 3.51953L13.0078 6.65111H17.6898Z" fill="#0052B4" />
            <path d="M0.310547 11.3457C0.620977 12.4974 1.15405 13.5575 1.86097 14.4772L4.99248 11.3457H0.310547Z" fill="#0052B4" />
            <path d="M14.4792 1.85905C13.5594 1.1521 12.4993 0.619023 11.3477 0.308594V4.9906L14.4792 1.85905Z" fill="#0052B4" />
            <path d="M3.52148 16.1374C4.44128 16.8443 5.50141 17.3774 6.65306 17.6878V13.0059L3.52148 16.1374Z" fill="#0052B4" />
            <path d="M6.65303 0.308594C5.50138 0.619023 4.44124 1.1521 3.52148 1.85902L6.65303 4.99056V0.308594Z" fill="#0052B4" />
            <path d="M11.3477 17.6878C12.4993 17.3774 13.5594 16.8443 14.4792 16.1374L11.3477 13.0059V17.6878Z" fill="#0052B4" />
            <path d="M13.0078 11.3457L16.1394 14.4773C16.8463 13.5575 17.3794 12.4974 17.6898 11.3457H13.0078Z" fill="#0052B4" />
            <path d="M17.9238 7.8261H10.174H10.1739V0.0761836C9.78964 0.0261563 9.39786 0 9 0C8.60207 0 8.21035 0.0261563 7.8261 0.0761836V7.82603V7.82606H0.0761836C0.0261563 8.21036 0 8.60214 0 9C0 9.39793 0.0261563 9.78964 0.0761836 10.1739H7.82603H7.82606V17.9238C8.21036 17.9738 8.60207 18 9 18C9.39786 18 9.78964 17.9739 10.1739 17.9238V10.174V10.1739H17.9238C17.9738 9.78964 18 9.39793 18 9C18 8.60214 17.9738 8.21035 17.9238 7.8261Z" fill="#D80027" />
            <path d="M11.3478 11.3479L15.3639 15.364C15.5487 15.1793 15.7249 14.9863 15.893 14.7862L12.4546 11.3478H11.3478V11.3479Z" fill="#D80027" />
            <path d="M6.65286 11.3477H6.65279L2.63672 15.3637C2.82136 15.5484 3.0144 15.7246 3.21451 15.8928L6.65286 12.4543V11.3477Z" fill="#D80027" />
            <path d="M6.65256 6.65293V6.65286L2.63645 2.63672C2.45174 2.82136 2.27554 3.0144 2.10742 3.21451L5.54581 6.6529H6.65256V6.65293Z" fill="#D80027" />
            <path d="M11.3477 6.6526L15.3638 2.63642C15.1792 2.45171 14.9861 2.2755 14.786 2.10742L11.3477 5.54581V6.6526Z" fill="#D80027" />
          </g>
          <defs>
            <clipPath id="clip0_5_837">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      code: 'Ukr',
      name: 'Ukr',
      flag: (
        <svg width="auto" height="auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_5_857)">
            <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#FFDA44" />
            <path d="M0 9C0 4.02947 4.02947 0 9 0C13.9705 0 18 4.02947 18 9" fill="#338AF3" />
          </g>
          <defs>
            <clipPath id="clip0_5_857">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>

      ),
    },
  ];

  const [services, setServices] = useState<ServiceOption[]>([
    {
      id: "1",
      name: "Инструктаж в тренажёрном зале",
      duration: "30 мин",
      price: "3 000",
      selected: false,
    },
    {
      id: "2",
      name: "Инструктаж в тренажёрном зале",
      duration: "30 мин",
      price: "3 000",
      selected: false,
    },
    {
      id: "3",
      name: "Инструктаж в тренажёрном зале",
      duration: "30 мин",
      price: "3 000",
      selected: false,
    },
    {
      id: "4",
      name: "Инструктаж в тренажёрном зале",
      duration: "30 мин",
      price: "3 000",
      selected: false,
    },
  ]);

  const [locations, setLocations] = useState<LocationOption[]>([
    {
      id: "1",
      name: "World Class",
      address: "г.Москва, ул. Тверская 32",
      selected: false,
    },
    {
      id: "2",
      name: "Зебра",
      address: "г.Москва, ул. Школьная 21",
      selected: false,
    },
    {
      id: "3",
      name: "DDX",
      address: "г.Москва, ул. Школьная 21",
      selected: false,
    },
    {
      id: "4",
      name: "World Class",
      address: "г.Москва, ул. Школьная 21",
      selected: false,
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const toggleService = (id: string) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, selected: !service.selected }
          : service,
      ),
    );
    setSelectedServiceId(id);
  };

  const selectLocation = (id: string) => {
    setLocations(
      locations.map((location) => ({
        ...location,
        selected: location.id === id,
      })),
    );
    setSelectedLocationId(id);
  };

  const selectTimeSlot = (id: string) => {
    setTimeSlots(
      timeSlots.map((slot) => ({
        ...slot,
        selected: slot.id === id && slot.available,
      })),
    );
    setSelectedTimeSlotId(id);
  };

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const response = await fetch(`https://coach-test.api.sofit.pw/widgets/coach?linkCode=${linkCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coach data');
        }
        const coachData: Coach = await response.json();
        setCoach(coachData);
      } catch (err) {
        // Use fallback data when fetch fails
        const fallbackCoach: Coach = {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          firstName: "Иванов",
          lastName: "Иван",
          patronymic: "",
          photo: "",
          gender: 0,
          birthday: 0,
          language: "ru",
          timezone: "string",
          phoneData: {
            countryCode: "7",
            number: "276664473",
            isoCode: "RU"
          },
          scopeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          linkCode: "string"
        };
        setCoach(fallbackCoach);
      } finally {
        setLoading(false);
      }
    };

    fetchCoach();
  }, [linkCode]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`https://coach-test.api.sofit.pw/widgets/locations?linkCode=${linkCode}&page=1&size=50`);
        if (!response.ok) {
          throw new Error('Failed to fetch locations data');
        }
        const locationsData: LocationsResponse = await response.json();
        // Transform API data to LocationOption format
        const transformedLocations: LocationOption[] = locationsData.items.map((item: LocationItem) => ({
          id: item.id,
          name: item.name || "Без названия",
          address: `${item.city || ""} ${item.street || ""}`.trim() || "Адрес не указан",
          selected: false,
        }));
        setLocations(transformedLocations);
      } catch (err) {
        // Use fallback data when fetch fails
        const fallbackLocations: LocationOption[] = [
          {
            id: "fallback-1",
            name: "World Class",
            address: "г.Москва, ул. Тверская 32",
            selected: false,
          },
          {
            id: "fallback-2",
            name: "Зебра",
            address: "г.Москва, ул. Школьная 21",
            selected: false,
          },
          {
            id: "fallback-3",
            name: "DDX",
            address: "г.Москва, ул. Школьная 21",
            selected: false,
          },
          {
            id: "fallback-4",
            name: "World Class",
            address: "г.Москва, ул. Школьная 21",
            selected: false,
          },
        ];
        setLocations(fallbackLocations);
      }
    };

    fetchLocations();
  }, [linkCode]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`https://coach-test.api.sofit.pw/widgets/services?linkCode=${linkCode}&page=1&size=50`);
        if (!response.ok) {
          throw new Error('Failed to fetch services data');
        }
        const servicesData: ServicesResponse = await response.json();
        // Transform API data to ServiceOption format
        const transformedServices: ServiceOption[] = servicesData.items.map((item: ServiceItem) => ({
          id: item.id,
          name: item.name || "Без названия",
          duration: `${item.duration} мин`,
          price: `${item.price.toLocaleString('ru-RU')} ₽`,
          selected: false,
        }));
        setServices(transformedServices);
      } catch (err) {
        // Use fallback data when fetch fails
        const fallbackServices: ServiceOption[] = [
          {
            id: "fallback-1",
            name: "Инструктаж в тренажёрном зале",
            duration: "30 мин",
            price: "3 000 ₽",
            selected: false,
          },
          {
            id: "fallback-2",
            name: "Персональная тренировка",
            duration: "60 мин",
            price: "5 000 ₽",
            selected: false,
          },
          {
            id: "fallback-3",
            name: "Групповая тренировка",
            duration: "45 мин",
            price: "2 000 ₽",
            selected: false,
          },
          {
            id: "fallback-4",
            name: "Консультация тренера",
            duration: "30 мин",
            price: "2 500 ₽",
            selected: false,
          },
        ];
        setServices(fallbackServices);
      }
    };

    fetchServices();
  }, [linkCode]);

  useEffect(() => {
    const fetchFreeSlots = async () => {
      // Always show time slots - use fallback data as default
      const fallbackSlots: TimeSlot[] = [
        { id: "fallback-1", time: "9:00", available: false, selected: false },
        { id: "fallback-2", time: "9:30", available: false, selected: false },
        { id: "fallback-3", time: "10:00", available: true, selected: false },
        { id: "fallback-4", time: "10:30", available: true, selected: false },
        { id: "fallback-5", time: "11:00", available: true, selected: false },
        { id: "fallback-6", time: "11:30", available: true, selected: false },
        { id: "fallback-7", time: "12:00", available: true, selected: false },
        { id: "fallback-8", time: "12:30", available: true, selected: false },
        { id: "fallback-9", time: "13:00", available: true, selected: false },
        { id: "fallback-10", time: "13:30", available: true, selected: false },
        { id: "fallback-11", time: "14:00", available: true, selected: false },
        { id: "fallback-12", time: "14:30", available: true, selected: false },
        { id: "fallback-13", time: "15:00", available: true, selected: false },
        { id: "fallback-14", time: "15:30", available: true, selected: false },
        { id: "fallback-15", time: "15:00", available: true, selected: false },
        { id: "fallback-16", time: "15:30", available: true, selected: false },
      ];

      // Try to fetch real data if we have all required parameters
      if (selectedLocationId && selectedServiceId && selectedDate) {
        try {
          // selectedDate is already a date string in YYYY-MM-DD format
          const dateFrom = selectedDate;
          const dateTo = selectedDate;

          const response = await fetch(
            `https://coach-test.api.sofit.pw/widgets/free-slots?linkCode=${linkCode}&locationId=${selectedLocationId}&serviceId=${selectedServiceId}&dateFrom=${dateFrom}&dateTo=${dateTo}`
          );
          if (response.ok) {
            const freeSlotsData: FreeSlotsResponse = await response.json();

            // Transform API data to TimeSlot format
            const transformedSlots: TimeSlot[] = [];
            freeSlotsData.schedule.forEach((day: ScheduleDay) => {
              day.freeSlots.forEach((slotTime: string, index: number) => {
                // Extract time from ISO string (e.g., "19:25:44.418Z" -> "19:25")
                const timeMatch = slotTime.match(/^(\d{2}:\d{2})/);
                const time = timeMatch ? timeMatch[1] : slotTime;
                transformedSlots.push({
                  id: `${day.date}-${index}`,
                  time: time,
                  available: true,
                  selected: false,
                });
              });
            });

            // Use real data if we got it
            if (transformedSlots.length > 0) {
              setTimeSlots(transformedSlots);
              return;
            }
          }
        } catch (err) {
          // Fall through to use fallback data
        }
      }

      // Use fallback data
      setTimeSlots(fallbackSlots);
    };

    fetchFreeSlots();
  }, [linkCode, selectedLocationId, selectedServiceId, selectedDate]);

  const hasSelectedLocation = locations.some(location => location.selected);
  const hasSelectedService = services.some(service => service.selected);
  const hasSelectedTimeSlot = timeSlots.some(slot => slot.selected);
  const isNextButtonDisabled = !hasSelectedLocation || !hasSelectedService || !hasSelectedTimeSlot;

  if (loading) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {!showPersonalDataForm && (
        <>
          {/* Header with trainer info */}
          <div className="relative min-h-[242px] xl:min-h-[580px] overflow-hidden">
            {/* Background gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-accent-primary to-accent-secondary"
              style={{
                background:
                  "linear-gradient(180deg, #0047ED 36.15%, #002887 147.81%)",
              }}
            />

            {/* Background decorative images */}
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/6950c77076262eff289e7765c5edd76f498dd95c?width=1440"
              alt=""
              className="absolute transform -left-[40px] -top-[20px] xl:top-0 xl:left-0 w-[210px] h-[280px] xl:w-[475px] xl:h-[580px]"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/7ac386323568972b52e277a7a368bbd00c9cb449?width=1200"
              alt=""
              className="absolute -top-[30px] xl:top-2 object-contain -right-[50px] xl:right-0 w-[180px] h-[280px] xl:w-[424px] xl:h-[580px]"
            />

            <div className="wrapper min-h-[242px] xl:min-h-[580px] relative mx-auto w-[calc(100%-32px)] xl:w-[calc(100%-240px)] xl:px-0">
              {/* Language selector */}
              <div className="absolute top-4 xl:top-10 right-0 max-w-[78px] xl:max-w-[190px] w-full">
                <div className="relative">
                  <div
                    className="flex items-center gap-1 xl:gap-2 bg-gray-100 rounded-[12px] xl:rounded-3xl px-2 py-2 xl:px-5 xl:py-4 shadow-lg cursor-pointer"
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  >
                    <div className="xl:w-11 w-[18px] xl:h-11 h-[18px] rounded-full overflow-hidden flex-shrink-0">
                      {languageOptions.find(lang => lang.code === selectedLanguage)?.flag}
                    </div>
                    <span className="text-content-primary text-[14px] xl:text-[32px] font-medium">
                      {selectedLanguage}
                    </span>
                    <svg
                      className={`xl:w-8 w-3 xl:h-8 h-3 text-content-primary transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {isLanguageMenuOpen && (
                    <div className="absolute bg-gray-100 w-full rounded-b-[12px] xl:rounded-b-3xl px-2 xl:px-5 shadow-lg pt-2  xl:py-2 xl:min-w-[120px] top-[calc(100%-9px)] xl:top-[calc(100%-20px)] overflow-hidden">
                      {languageOptions.filter(lang => lang.code !== selectedLanguage).map((lang) => (
                        <div
                          key={lang.code}
                          className="flex items-center gap-1 xl:gap-3 py-2 xl:py-3 border-t-2 xl:border-t-4 border-white  cursor-pointer"
                          onClick={() => {
                            setSelectedLanguage(lang.code);
                            setIsLanguageMenuOpen(false);
                          }}
                        >
                          <div className="xl:w-11 w-[18px] xl:h-11 h-[18px] rounded-full overflow-hidden flex-shrink-0">
                            {lang.flag}
                          </div>
                          <span className="text-content-primary text-[14px] xl:text-[32px] font-medium">
                            {lang.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Trainer info */}
              <div className="absolute bottom-[10px] xl:bottom-[25px] left-0 flex items-center gap-4 xl:gap-8">
                {/* Profile picture */}
                <div className="xl:w-[168px] w-[70px] xl:h-[168px] h-[70px] rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={coach?.photo || "https://api.builder.io/api/v1/image/assets/TEMP/d9b62a20c720da0c271ee07e8d57b547884a3da7?width=336"}
                    alt={coach ? `${coach.firstName} ${coach.lastName}` : "Тренер"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Trainer details */}
                <div className="text-white font-sf-pro">
                  <h1 className="text-[20px] xl:text-4xl  font-bold mb-2 xl:mb-5 leading-tight">
                    {coach ? `${coach.firstName} ${coach.lastName}` : 'Тренер'}
                  </h1>
                  <p className="text-[14px] xl:text-2xl  font-normal opacity-90 leading-tight">
                    Персональный тренер
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!showPersonalDataForm ? (
        <div className="max-w-[calc(100%-32px)] xl:max-w-[823px] mx-auto mt-4 space-y-4 xl:space-y-8 xl:mt-8 relative z-10">
          {/* Location Section */}
          <LocationSection
            locations={locations}
            onSelectLocation={selectLocation}
            isOpen={isLocationOpen}
            onToggle={() => setIsLocationOpen(!isLocationOpen)}
          />

          {/* Services Section */}
          <ServicesSection
            services={services}
            onToggleService={toggleService}
            isOpen={isServicesOpen}
            onToggle={() => setIsServicesOpen(!isServicesOpen)}
          />

          {/* Date & Time Section */}
          <DateTimeSection
            selectedDate={selectedDate}
            timeSlots={timeSlots}
            onSelectDate={setSelectedDate}
            onSelectTimeSlot={selectTimeSlot}
            isOpen={isDateTimeOpen}
            onToggle={() => setIsDateTimeOpen(!isDateTimeOpen)}
          />

          {/* Continue Button */}
          <div className="pb-20 xl:pb-40">
            <Button
              className="w-full xl:h-[116px] h-[48px] xl:text-[32px] text-[16px] font-semibold rounded-[16px] xl:rounded-[40px] bg-accent-primary hover:bg-accent-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
              disabled={isNextButtonDisabled}
              onClick={() => setShowPersonalDataForm(true)}
            >
              Далее
            </Button>
          </div>
        </div>
      ) : showErrorScreen ? (
        /* Error Screen - Full Page */
        <div className="min-h-screen bg-white flex items-center justify-center xl:p-8 p-4">
          <div className="max-w-[823px] w-full">
            {/* Error Icon */}
            <div className="flex justify-center xl:mb-[60px] mb-8">
              <svg className="xl:w-[240px] w-[120px] xl:h-[240px] h-[120px]" width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="120" cy="120" r="120" fill="#0047ED" />
                <path d="M111.993 140.107L110.329 63.5285H129.592L128.007 140.107H111.993ZM120.079 179.744C112.707 179.744 107.792 174.988 107.792 167.932C107.792 160.798 112.707 156.041 120.079 156.041C127.372 156.041 132.208 160.798 132.208 167.932C132.208 174.988 127.372 179.744 120.079 179.744Z" fill="white" />
              </svg>

            </div>

            {/* Title */}
            <div className="text-center xl:mb-[60px] mb-8">
              <h1 className="xl:text-[66px] text-[32px] font-bold text-content-primary xl:mb-5 mb-3">
                Упс, ошибка
              </h1>
              <p className="xl:text-[38px] text-[18px] text-content-secondary">
                Произошла ошибка, попробуйтезаписаться заново
              </p>
            </div>

            {/* Back to Main Button */}
            <div className="xl:mt-12 mt-8">
              <Button
                className="w-full xl:h-[116px] h-[48px] xl:text-[32px] text-[16px] font-semibold rounded-[16px] xl:rounded-[40px] bg-accent-primary hover:bg-accent-secondary"
                size="lg"
                onClick={() => {
                  setShowPersonalDataForm(false);
                  setShowSuccessScreen(false);
                  setShowErrorScreen(false);
                  setFirstName('');
                  setLastName('');
                  setPhone('');
                }}
              >
                На главную
              </Button>
            </div>
          </div>
        </div>
      ) : !showSuccessScreen ? (
        /* Personal Data Form - Full Page */
        <div className="min-h-screen bg-white flex items-center justify-center xl:p-8 p-4">
          {/* Form Section */}
          <div className="max-w-[823px] w-full">
            {/* Title */}
            <div className="xl:mb-14 mb-8">
              <h1 className="xl:text-[56px] text-[28px] font-bold text-content-primary xl:mb-5 mb-3">
                Введите свои данные
              </h1>
              <p className="xl:text-[32px] text-[16px] text-content-secondary">
                Данные необходимы для обратной связи тренера с Вами
              </p>
            </div>

            {/* Form */}
            <div className="space-y-2 xl:space-y-5">
              <Input
                type="text"
                placeholder="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#F6F7FA] w-full xl:h-[134px] h-[56px] xl:text-[32px] text-[16px] xl:px-8 px-6 rounded-[16px] xl:rounded-[40px] focus:border-accent-primary"
              />

              <Input
                type="text"
                placeholder="Фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#F6F7FA] w-full xl:h-[134px] h-[56px] xl:text-[32px] text-[16px] xl:px-8 px-6 rounded-[16px] xl:rounded-[40px] focus:border-accent-primary"
              />

              <Input
                type="tel"
                placeholder="+79999999999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-[#F6F7FA] w-full xl:h-[134px] h-[56px] xl:text-[32px] text-[16px] xl:px-8 px-6 rounded-[16px] xl:rounded-[40px] focus:border-accent-primary"
              />
            </div>

            {/* Continue Button */}
            <div className="xl:mt-12 mt-8">
              <Button
                className="w-full xl:h-[116px] h-[48px] xl:text-[32px] text-[16px] font-semibold rounded-[16px] xl:rounded-[40px] bg-accent-primary hover:bg-accent-secondary"
                size="lg"
                onClick={async () => {
                  if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
                    setShowErrorScreen(true);
                    return;
                  }

                  // Find selected location, service, and time slot
                  const selectedLocation = locations.find(loc => loc.selected);
                  const selectedService = services.find(svc => svc.selected);
                  const selectedTimeSlot = timeSlots.find(slot => slot.selected);

                  if (!selectedLocation || !selectedService || !selectedTimeSlot) {
                    setShowErrorScreen(true);
                    return;
                  }

                  // Skip real API call and show success directly for testing
                  setShowSuccessScreen(true);
                }}
              >
                Далее
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Success Screen - Full Page */
        <div className="min-h-screen bg-white flex items-center justify-center xl:p-8 p-4">
          <div className="max-w-[823px] w-full">
            {/* Success Icon */}
            <div className="flex justify-center xl:mb-8 mb-6">
              <svg className="xl:w-[240px] w-[120px] xl:h-[241px] h-[121px]" width="240" height="241" viewBox="0 0 240 241" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="120" cy="120.9" r="120" fill="#0047ED" />
                <path d="M177.574 81.2769L103.181 155.67L69.3657 121.855" stroke="white" stroke-width="18.4971" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            {/* Title */}
            <div className="text-center xl:mb-[60px] mb-8">
              <h1 className="xl:text-[66px] text-[32px] font-bold text-content-primary xl:mb-5 mb-3">
                Отлично
              </h1>
              <p className="xl:text-[38px] text-[18px] text-content-secondary">
                Вы успешно записались!
              </p>
            </div>

            {/* Information Block */}
            <div className="xl:mb-12 mb-8">
              <h2 className="xl:text-[56px] text-[28px] font-semibold text-content-primary xl:mb-4 mb-3">
                Информация
              </h2>
              <div className="">
                {/* Info Item 1 */}
                <div className="flex items-start xl:gap-[30px] gap-4 xl:pb-8 pb-4 xl:py-8 py-4 border-b border-gray-200">
                  <div>
                    <svg className="xl:w-[97px] w-[48px] xl:h-[97px] h-[48px]" width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.600098" y="0.899902" width="96" height="96" rx="30" fill="#F6F7FA" />
                      <path d="M27.6001 67.5666C33.0503 61.7859 40.4498 58.2332 48.6001 58.2332C56.7504 58.2332 64.1499 61.7859 69.6001 67.5666M59.1001 38.3999C59.1001 44.1989 54.3991 48.8999 48.6001 48.8999C42.8011 48.8999 38.1001 44.1989 38.1001 38.3999C38.1001 32.6009 42.8011 27.8999 48.6001 27.8999C54.3991 27.8999 59.1001 32.6009 59.1001 38.3999Z" stroke="#0047ED" stroke-width="4.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="xl:text-[36px] text-[16px] xl:mb-2 mb-1 text-[#9A9B9D]">Тренер</h3>
                    <p className="xl:text-[36px] text-[16px] text-[#1C1E24]">{coach ? `${coach.firstName} ${coach.lastName}` : 'Петров Александр'}</p>
                  </div>
                </div>

                {/* Info Item 2 */}
                <div className="flex items-start xl:gap-[30px] gap-4 xl:py-8 py-4 border-b border-gray-200">
                  <div>
                    <svg className="xl:w-[97px] w-[48px] xl:h-[97px] h-[48px]" width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.600098" y="0.899902" width="96" height="96" rx="30" fill="#F6F7FA" />
                      <path d="M48.6003 51.2333C52.4663 51.2333 55.6003 48.0993 55.6003 44.2333C55.6003 40.3673 52.4663 37.2333 48.6003 37.2333C44.7343 37.2333 41.6003 40.3673 41.6003 44.2333C41.6003 48.0993 44.7343 51.2333 48.6003 51.2333Z" stroke="#0047ED" stroke-width="4.66667" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M48.6003 72.2333C57.9336 62.9 67.2669 54.5426 67.2669 44.2333C67.2669 33.924 58.9096 25.5667 48.6003 25.5667C38.2909 25.5667 29.9336 33.924 29.9336 44.2333C29.9336 54.5426 39.2669 62.9 48.6003 72.2333Z" stroke="#0047ED" stroke-width="4.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="xl:text-[36px] text-[16px] xl:mb-2 mb-1 text-[#9A9B9D]">Локация</h3>
                    <p className="xl:text-[36px] text-[16px] text-[#1C1E24]">World Class </p>
                    <h4 className="xl:text-[28px] text-[12px] text-[#9A9B9D]">г.Москва ул, Тверская 32</h4>
                  </div>
                </div>

                {/* Info Item 3 */}
                <div className="flex items-start xl:gap-[30px] gap-4 xl:py-8 py-4 border-b border-gray-200">
                  <div>
                    <svg className="xl:w-[97px] w-[48px] xl:h-[97px] h-[48px]" width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.600098" y="0.0998535" width="96" height="96" rx="30" fill="#F6F7FA" />
                      <path d="M70.0909 57.1764C68.6065 60.6868 66.2847 63.7802 63.3286 66.1861C60.3725 68.5919 56.872 70.237 53.1332 70.9775C49.3945 71.718 45.5312 71.5314 41.8812 70.4339C38.2312 69.3364 34.9057 67.3615 32.1953 64.6819C29.4848 62.0022 27.4721 58.6995 26.333 55.0622C25.1939 51.425 24.9632 47.5642 25.6609 43.8172C26.3587 40.0702 27.9637 36.5512 30.3356 33.5678C32.7076 30.5844 35.7743 28.2274 39.2675 26.703M70.1581 39.1704C71.0922 41.4255 71.6651 43.8095 71.8596 46.235C71.9076 46.8342 71.9316 47.1338 71.8127 47.4037C71.7133 47.6291 71.5164 47.8424 71.2996 47.9595C71.0401 48.0997 70.7159 48.0997 70.0675 48.0997H50.4675C49.8142 48.0997 49.4875 48.0997 49.2379 47.9725C49.0184 47.8607 48.8399 47.6822 48.728 47.4627C48.6009 47.2131 48.6009 46.8864 48.6009 46.233V26.633C48.6009 25.9847 48.6009 25.6605 48.741 25.401C48.8581 25.1842 49.0715 24.9873 49.2969 24.8879C49.5668 24.7689 49.8664 24.7929 50.4656 24.841C52.891 25.0354 55.2751 25.6084 57.5302 26.5425C60.3611 27.7151 62.9333 29.4338 65.1 31.6005C67.2667 33.7672 68.9855 36.3395 70.1581 39.1704Z" stroke="#0047ED" stroke-width="4.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="xl:text-[36px] text-[16px] xl:mb-2 mb-1 text-[#9A9B9D]">Услуга</h3>
                    <p className="xl:text-[36px] text-[16px] text-[#1C1E24]">Инструктаж в тренажёрном зале</p>
                  </div>
                </div>

                {/* Info Item 4 */}
                <div className="flex items-start xl:gap-[30px] gap-4 xl:py-8 py-4 border-b border-gray-200">
                  <div>
                    <svg className="xl:w-[97px] w-[48px] xl:h-[97px] h-[48px]" width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.600098" y="0.0998535" width="96" height="96" rx="30" fill="#F6F7FA" />
                      <path d="M48.5999 34.0999V48.0999L57.9333 52.7666M71.9333 48.0999C71.9333 60.9866 61.4866 71.4333 48.5999 71.4333C35.7133 71.4333 25.2666 60.9866 25.2666 48.0999C25.2666 35.2133 35.7133 24.7666 48.5999 24.7666C61.4866 24.7666 71.9333 35.2133 71.9333 48.0999Z" stroke="#0047ED" stroke-width="4.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="xl:text-[36px] text-[16px] xl:mb-2 mb-1 text-[#9A9B9D]">Время</h3>
                    <p className="xl:text-[36px] text-[16px] text-[#1C1E24]">10:30 - 11:00</p>
                  </div>
                </div>

                {/* Info Item 5 */}
                <div className="flex items-start xl:gap-[30px] gap-4 xl:pt-8 pt-4">
                  <div>
                    <svg className="xl:w-[97px] w-[48px] xl:h-[97px] h-[48px]" width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.600098" y="0.100098" width="96" height="96" rx="30" fill="#F6F7FA" />
                      <path d="M50.9333 31.7668C50.9333 34.3441 45.1876 36.4334 38.0999 36.4334C31.0123 36.4334 25.2666 34.3441 25.2666 31.7668M50.9333 31.7668C50.9333 29.1894 45.1876 27.1001 38.0999 27.1001C31.0123 27.1001 25.2666 29.1894 25.2666 31.7668M50.9333 31.7668V35.2668M25.2666 31.7668V59.7668C25.2666 62.3441 31.0123 64.4334 38.0999 64.4334M38.0999 45.7668C37.7067 45.7668 37.3175 45.7603 36.9333 45.7477C30.3924 45.5334 25.2666 43.5344 25.2666 41.1001M38.0999 55.1001C31.0123 55.1001 25.2666 53.0108 25.2666 50.4334M71.9333 46.9334C71.9333 49.5108 66.1876 51.6001 59.0999 51.6001C52.0123 51.6001 46.2666 49.5108 46.2666 46.9334M71.9333 46.9334C71.9333 44.3561 66.1876 42.2668 59.0999 42.2668C52.0123 42.2668 46.2666 44.3561 46.2666 46.9334M71.9333 46.9334V64.4334C71.9333 67.0108 66.1876 69.1001 59.0999 69.1001C52.0123 69.1001 46.2666 67.0108 46.2666 64.4334V46.9334M71.9333 55.6834C71.9333 58.2608 66.1876 60.3501 59.0999 60.3501C52.0123 60.3501 46.2666 58.2608 46.2666 55.6834" stroke="#0047ED" stroke-width="4.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="xl:text-[36px] text-[16px] xl:mb-2 mb-1 text-[#9A9B9D]">Цена</h3>
                    <p className="xl:text-[36px] text-[16px] text-[#1C1E24]">3 000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Main Button */}
            <div className="xl:mt-12 mt-8">
              <Button
                className="w-full xl:h-[116px] h-[48px] xl:text-[32px] text-[16px] font-semibold rounded-[16px] xl:rounded-[40px] bg-accent-primary hover:bg-accent-secondary"
                size="lg"
                onClick={() => {
                  setShowPersonalDataForm(false);
                  setShowSuccessScreen(false);
                  setFirstName('');
                  setLastName('');
                  setPhone('');
                }}
              >
                На главную
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Services Section Component
function ServicesSection({
  services,
  onToggleService,
  isOpen,
  onToggle,
}: {
  services: ServiceOption[];
  onToggleService: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <Card className={"xl:px-10 p-6 xl:py-[60px] rounded-[18px] xl:rounded-[40px] bg-background-secondary border-0 shadow-sm"}>
        {/* Header */}
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-[12px] xl:gap-8 cursor-pointer">
            <svg
              className="xl:w-[58px] w-[24px] xl:h-[58px] h-[24px]"
              width="58"
              height="58"
              viewBox="0 0 58 58"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M50.905 38.336C49.3782 41.9467 46.9901 45.1285 43.9495 47.6031C40.9089 50.0777 37.3085 51.7698 33.4629 52.5314C29.6173 53.2931 25.6436 53.1011 21.8894 51.9723C18.1351 50.8435 14.7145 48.8121 11.9267 46.0559C9.13881 43.2997 7.06857 39.9026 5.89694 36.1615C4.72531 32.4203 4.48796 28.4491 5.20565 24.5951C5.92334 20.741 7.57421 17.1215 10.0139 14.0528C12.4536 10.9842 15.6079 8.55993 19.201 6.99197M50.9741 19.8156C51.9349 22.1351 52.5243 24.5872 52.7243 27.082C52.7737 27.6983 52.7984 28.0065 52.676 28.2841C52.5738 28.5159 52.3712 28.7354 52.1483 28.8558C51.8813 29 51.5479 29 50.881 29H30.721C30.049 29 29.7129 29 29.4562 28.8692C29.2304 28.7541 29.0469 28.5706 28.9318 28.3448C28.801 28.0881 28.801 27.752 28.801 27.08V6.91997C28.801 6.25309 28.801 5.91965 28.9452 5.65273C29.0656 5.42976 29.2851 5.22723 29.5169 5.125C29.7945 5.00261 30.1027 5.02732 30.719 5.07673C33.2137 5.27674 35.6659 5.86609 37.9854 6.82686C40.8972 8.03298 43.543 9.8008 45.7716 12.0294C48.0002 14.258 49.768 16.9038 50.9741 19.8156Z"
                stroke="#0047ED"
                strokeWidth="4.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="flex-1 text-[16px] xl:text-3xl font-medium text-content-primary">
              Услуги
            </h2>

            <svg
              width="58"
              height="58"
              viewBox="0 0 58 58"
              fill="none"
              className={`xl:w-[58px] w-[24px] xl:h-[58px] h-[24px] transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            >
              <path
                d="M14.8001 36.2003L29.2001 21.8003L43.6001 36.2003"
                stroke="#8E93AD"
                strokeWidth="4.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {/* Service options */}
          <div className="space-y-2 xl:space-y-3 mt-4 xl:mt-10">
            {services.map((service, index) => (
              <div key={service.id}>
                <div className="h-0.5 bg-gray-100 my-2 xl:my-5" />
                <ServiceItem
                  service={service}
                  onToggle={() => onToggleService(service.id)}
                />
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible >
  );
}

// Individual Service Item
function ServiceItem({
  service,
  onToggle,
}: {
  service: ServiceOption;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-[2px] xl:space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="xl:text-3xl text-[16px] font-medium text-content-primary flex-1">
          {service.name}
        </h3>
        <button
          onClick={onToggle}
          className="xl:w-12 w-5 h-5 xl:h-12 rounded-full flex-shrink-0"
        >
          {service.selected ? (
            <div className="xl:w-11 w-5 h-5 xl:h-11 bg-accent-primary rounded-full flex items-center justify-center text-white text-[12px] xl:text-2xl">
              ✓
            </div>
          ) : (
            <div className="xl:w-11 w-5 h-5 xl:h-11 border-2 border-content-tertiary rounded-full" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-6 xl:gap-24 text-content-secondary">
        <div className="flex items-center gap-1 xl:gap-2">
          <svg className="xl:w-[38px] w-[16px] xl:h-[39px] h-[17px]" width="38" height="39" viewBox="0 0 38 39" fill="none">
            <path
              d="M19 35.2331C27.7445 35.2331 34.8333 28.1443 34.8333 19.3997C34.8333 10.6552 27.7445 3.56641 19 3.56641C10.2555 3.56641 3.16663 10.6552 3.16663 19.3997C3.16663 28.1443 10.2555 35.2331 19 35.2331Z"
              stroke="#8E93AD"
              strokeWidth="3.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 9.8999V19.3999L25.3333 22.5666"
              stroke="#8E93AD"
              strokeWidth="3.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12px] xl:text-2xl">{service.duration}</span>
        </div>

        <div className="flex items-center gap-1 xl:gap-2">
          <svg className="xl:w-[39px] w-[17px] xl:h-[39px] h-[17px]" width="39" height="39" viewBox="0 0 39 39" fill="none">
            <path
              d="M19.3333 27.3166C19.3333 31.6888 22.8777 35.2332 27.25 35.2332C31.6223 35.2332 35.1667 31.6888 35.1667 27.3166C35.1667 22.9443 31.6223 19.3999 27.25 19.3999C22.8777 19.3999 19.3333 22.9443 19.3333 27.3166ZM19.3333 27.3166C19.3333 25.534 19.9225 23.8891 20.9167 22.5658V8.31657M19.3333 27.3166C19.3333 28.6234 19.65 29.8562 20.2107 30.9426C18.8768 32.0694 15.7959 32.8582 12.2083 32.8582C7.39885 32.8582 3.5 31.4405 3.5 29.6916V8.31657M20.9167 8.31657C20.9167 10.0655 17.0178 11.4832 12.2083 11.4832C7.39885 11.4832 3.5 10.0655 3.5 8.31657M20.9167 8.31657C20.9167 6.56767 17.0178 5.1499 12.2083 5.1499C7.39885 5.1499 3.5 6.56767 3.5 8.31657M3.5 22.5666C3.5 24.3155 7.39885 25.7332 12.2083 25.7332C15.6743 25.7332 18.6673 24.997 20.069 23.9311M20.9167 15.4416C20.9167 17.1905 17.0178 18.6082 12.2083 18.6082C7.39885 18.6082 3.5 17.1905 3.5 15.4416"
              stroke="#8E93AD"
              strokeWidth="3.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12px] xl:text-2xl">{service.price}</span>
        </div>
      </div>
    </div>
  );
}

// Location Section Component
function LocationSection({
  locations,
  onSelectLocation,
  isOpen,
  onToggle,
}: {
  locations: LocationOption[];
  onSelectLocation: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <Card className={"xl:px-10 p-6 xl:py-[60px] rounded-[18px] xl:rounded-[40px] bg-background-secondary border-0 shadow-sm"}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-[12px] xl:gap-8 cursor-pointer">
            <svg className="xl:w-[56px] w-[24px] xl:h-[56px] h-[24px]" width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path
                d="M28 30.3334C31.866 30.3334 35 27.1994 35 23.3334C35 19.4674 31.866 16.3334 28 16.3334C24.134 16.3334 21 19.4674 21 23.3334C21 27.1994 24.134 30.3334 28 30.3334Z"
                stroke="#0047ED"
                strokeWidth="4.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M28 51.3334C37.3334 42.0001 46.6667 33.6427 46.6667 23.3334C46.6667 13.0241 38.3094 4.66675 28 4.66675C17.6907 4.66675 9.33337 13.0241 9.33337 23.3334C9.33337 33.6427 18.6667 42.0001 28 51.3334Z"
                stroke="#0047ED"
                strokeWidth="4.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="flex-1 text-[16px] xl:text-3xl font-medium text-content-primary">
              Локация
            </h2>

            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              className={`xl:w-[56px] w-[24px] xl:h-[56px] h-[24px] transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            >
              <path
                d="M14 35L28 21L42 35"
                stroke="#8E93AD"
                strokeWidth="4.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {/* Location options */}
          <div className="xl:space-y-5 mt-4 xl:mt-10">
            {locations.map((location, index) => (
              <div key={location.id}>
                <div className="h-0.5 bg-gray-100 my-2 xl:my-5" />
                <LocationItem
                  location={location}
                  onSelect={() => onSelectLocation(location.id)}
                />
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Card >
    </Collapsible >
  );
}

// Individual Location Item
function LocationItem({
  location,
  onSelect,
}: {
  location: LocationOption;
  onSelect: () => void;
}) {
  return (
    <div className="space-y-[2px] xl:space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="xl:text-3xl text-[16px] font-medium text-content-primary flex-1">
          {location.name}
        </h3>
        <button
          onClick={onSelect}
          className="xl:w-12 w-5 h-5 xl:h-12 rounded-full flex-shrink-0"
        >
          {location.selected ? (
            <div className="xl:w-11 w-5 h-5 xl:h-11 bg-accent-primary rounded-full flex items-center justify-center text-white text-[12px] xl:text-2xl">
              ✓
            </div>
          ) : (
            <div className="xl:w-11 w-5 h-5 xl:h-11 border-2 border-content-tertiary rounded-full" />
          )}
        </button>
      </div>

      <div className="text-content-secondary text-[12px] xl:text-2xl">{location.address}</div>
    </div>
  );
}

// Date & Time Section Component
function DateTimeSection({
  selectedDate,
  timeSlots,
  onSelectDate,
  onSelectTimeSlot,
  isOpen,
  onToggle,
}: {
  selectedDate: string;
  timeSlots: TimeSlot[];
  onSelectDate: (date: string) => void;
  onSelectTimeSlot: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Calculate offset to Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    return monday;
  });

  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const getWeekDays = (weekStart: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push({
        date: day.getDate(),
        month: day.getMonth(),
        year: day.getFullYear(),
        fullDate: day,
      });
    }
    return days;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setDate(newDate.getDate() - 7);
        // Check if the new week would contain past dates
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        const newWeekEnd = new Date(newDate);
        newWeekEnd.setDate(newDate.getDate() + 6);
        newWeekEnd.setHours(23, 59, 59, 999); // End of day

        if (newWeekEnd < today) {
          return prevDate; // Don't navigate if it would show past dates
        }
      } else {
        newDate.setDate(newDate.getDate() + 7);
      }
      return newDate;
    });
  };

  const canNavigatePrev = () => {
    const prevWeekStart = new Date(currentWeekStart);
    prevWeekStart.setDate(currentWeekStart.getDate() - 7);
    const prevWeekEnd = new Date(prevWeekStart);
    prevWeekEnd.setDate(prevWeekStart.getDate() + 6);
    prevWeekEnd.setHours(23, 59, 59, 999);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return prevWeekEnd >= today;
  };

  const weekDaysData = getWeekDays(currentWeekStart);
  const today = new Date();

  const formatMonthYear = (weekStart: Date) => {
    const monthNames = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    return `${monthNames[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <Card className={"xl:px-10 p-6 xl:py-[60px] rounded-[18px] xl:rounded-[40px] bg-background-secondary border-0 shadow-sm"}>
        {/* Header */}
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-[12px] xl:gap-8 cursor-pointer">
            <svg
              className="xl:w-[56px] w-[24px] xl:h-[56px] h-[24px]"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M28 13.9998V27.9998L37.3333 32.6665M51.3333 27.9998C51.3333 40.8865 40.8866 51.3332 28 51.3332C15.1133 51.3332 4.66663 40.8865 4.66663 27.9998C4.66663 15.1132 15.1133 4.6665 28 4.6665C40.8866 4.6665 51.3333 15.1132 51.3333 27.9998Z"
                stroke="#0047ED"
                strokeWidth="4.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="flex-1 text-[16px] xl:text-3xl font-medium text-content-primary">
              Дата и время
            </h2>

            <svg
              width="57"
              height="56"
              viewBox="0 0 57 56"
              fill="none"
              className={`xl:w-[57px] w-[24px] xl:h-[56px] h-[24px] transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            >
              <path
                d="M14.1999 35L28.2 21L42.2 35"
                stroke="#8E93AD"
                strokeWidth="4.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="xl:space-y-5 space-y-3 xl:mt-10">
            <div className="h-0.5 bg-gray-300 mt-6 xl:my-8" />

            {/* Calendar */}
            <div className="bg-white rounded-3xl xl:p-10 p-4 mb-8">
              {/* Week header */}
              <div className="flex items-center justify-between xl:mb-8 mb-3">
                <h3 className="xl:text-3xl text-[16px] font-medium text-content-primary">
                  {formatMonthYear(currentWeekStart)}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateWeek('prev')}
                    disabled={!canNavigatePrev()}
                    className={`text-accent-primary hover:opacity-70 ${!canNavigatePrev() ? 'opacity-30 cursor-not-allowed' : ''}`}
                  >
                    <svg className="xl:w-[57px] w-[24px] xl:h-[57px] h-[24px]" width="57" height="57" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => navigateWeek('next')}
                    className="text-accent-primary hover:opacity-70"
                  >
                    <svg className="xl:w-[57px] w-[24px] xl:h-[57px] h-[24px]" width="57" height="57" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Days of week and dates */}
              <div className="grid grid-cols-7 xl:gap-4 gap-2">
                {weekDays.map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-content-secondary xl:text-[28px] text-[12px] xl:mb-8 mb-4">{day}</div>
                    <button
                      onClick={() => onSelectDate(weekDaysData[index].fullDate.toISOString().split('T')[0])}
                      className={`xl:w-20 w-8 xl:h-20 h-8 rounded-full xl:text-[48px] text-[20px] font-medium transition-colors ${selectedDate === weekDaysData[index].fullDate.toISOString().split('T')[0]
                        ? "bg-accent-primary text-white"
                        : weekDaysData[index].fullDate.toDateString() === today.toDateString()
                          ? "bg-accent-secondary text-white"
                          : "text-content-primary hover:bg-gray-100"
                        }`}
                    >
                      {weekDaysData[index].date}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-0.5 bg-gray-300 mb-8" />

            {/* Time slots */}
            <div className="xl:space-y-7 space-y-4">
              {Array.from({ length: 4 }, (_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-4 xl:gap-8 gap-4">
                  {timeSlots.slice(rowIndex * 4, (rowIndex + 1) * 4).map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => onSelectTimeSlot(slot.id)}
                      disabled={!slot.available}
                      className={`xl:px-10  h-[36px] xl:py-[18px] sm:h-[50px] xl:h-[90px] rounded-full xl:text-[32px] text-[16px] font-medium transition-colors ${slot.selected
                        ? "bg-accent-primary text-white"
                        : slot.available
                          ? "bg-white border border-gray-200 text-content-secondary hover:bg-gray-50"
                          : "bg-white border border-gray-200 text-content-secondary opacity-50 cursor-not-allowed"
                        }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
